# Staging cPanel manual

Dokumen ini menjelaskan release manual untuk staging cPanel. Dokumen ini
bukan CI/CD, pipeline deployment, atau instruksi cutover production.

## Prasyarat build environment

- PHP 8.3 atau lebih baru dengan ekstensi MySQL/PDO, Mbstring, OpenSSL,
  Tokenizer, XML, Ctype, JSON, Fileinfo, dan BCMath.
- Composer 2, Node.js 22.12 atau lebih baru, dan npm untuk membuat aset sekali
  sebelum upload.
- Akses cPanel File Manager atau SFTP, terminal PHP/Composer jika tersedia,
  dan database MySQL/MariaDB staging yang terpisah.

## Membuat artifact

Jalankan pada PC/build environment, bukan pada server cPanel:

```text
npm ci
npm run check
npm run types:check
npm run build
npm run build:ssr
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
```

Gunakan salinan source terpisah untuk command Composer production tersebut agar
vendor pengembangan lokal tidak ikut masuk artifact. Artifact ZIP hanya memuat
source Laravel, `vendor/`, dan `public/build/`. Jangan masukkan `.env`, `.git`,
`node_modules`, `.migration`, folder test, output test, atau log lokal.

`npm run build:ssr` hanyalah pemeriksaan kompatibilitas. Jangan upload
`bootstrap/ssr` dan jangan menjalankan proses SSR Node di cPanel.

## Konfigurasi staging cPanel

1. Buat folder aplikasi staging yang terpisah dari aplikasi lama/production.
2. Arahkan document root subdomain staging ke `<folder-aplikasi>/public`.
3. Buat database dan user MySQL/MariaDB staging yang baru, lalu berikan hak
   akses hanya untuk database staging itu.
4. Buat `.env` langsung di server dari `.env.example`; jangan memasukkannya ke
   ZIP atau repository.
5. Atur setidaknya nilai berikut:

```dotenv
APP_ENV=staging
APP_DEBUG=false
APP_URL=https://<domain-staging>
APP_KEY=<hasil php artisan key:generate --show>

DB_CONNECTION=mysql
DB_HOST=<host-mysql>
DB_PORT=3306
DB_DATABASE=<database-staging>
DB_USERNAME=<user-staging>
DB_PASSWORD=<rahasia>

SESSION_DRIVER=database
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true
CACHE_STORE=database
QUEUE_CONNECTION=database
INERTIA_SSR_ENABLED=false
```

Gunakan kredensial baru untuk akun admin dan staff staging. Password legacy dan
session aplikasi Next.js tidak dipindahkan.

## Perintah server setelah upload

Jalankan dari folder aplikasi staging setelah `.env` tersedia:

```text
php artisan key:generate --force
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan optimize
```

Jalankan `db:seed` hanya pada database staging baru karena seed menggantikan
data dummy. Jangan menjalankannya pada production atau database yang berisi
konten yang harus dipertahankan.

## Smoke test staging

Verifikasi melalui domain staging (bukan localhost):

1. Halaman `/`, `/en`, `/id`, dan `/pt` serta redirect locale.
2. Halaman publik products dan detail product hanya menampilkan konten
   published.
3. Login akun staff dan admin; staff tidak dapat publish atau mengelola user.
4. Simpan draft, publish sebagai admin, dan cek revision serta perubahan
   publik.
5. Uji media approved/tidak approved, logout, dan akun nonaktif.
6. Periksa `/up`, error log Laravel/cPanel, dan tidak ada error browser.

## Batas Phase 9

Tahap ini tidak melakukan deployment otomatis, cutover, perubahan DNS/domain
production, atau penghapusan aplikasi Next.js. Rehearsal dan cutover berada di
Phase 10 dan memerlukan izin terpisah.
