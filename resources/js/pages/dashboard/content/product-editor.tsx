import { useForm, usePage } from '@inertiajs/react';
import { update } from '@/actions/App/Http/Controllers/Dashboard/ProductController';
import ProductPublicationController from '@/actions/App/Http/Controllers/Dashboard/ProductPublicationController';
import EditorShell from '@/components/dashboard/editor-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Translation = {
    locale: string;
    title: string;
    body: string;
    capacity: string | null;
    products: string[] | null;
    machinery: string | null;
};
type ProductData = {
    slug: string;
    gallery: string[];
    video_en: string | null;
    video_id: string | null;
    video_pt: string | null;
    draft: Record<string, unknown> | null;
    translations: Translation[];
};
const locales = ['en', 'id', 'pt'] as const;

export default function ProductEditor({ product }: { product: ProductData }) {
    const auth = usePage<{ auth: { user: { role: string } } }>().props.auth;
    const existing = Object.fromEntries(
        product.translations.map((item) => [item.locale, item]),
    );
    const draft = product.draft as {
        translations?: Record<string, Translation>;
        gallery?: string[];
        video_en?: string;
        video_id?: string;
        video_pt?: string;
    } | null;
    const translation = (locale: string) =>
        draft?.translations?.[locale] ??
        existing[locale] ?? {
            title: '',
            body: '',
            capacity: '',
            products: [],
            machinery: '',
        };
    const form = useForm({
        gallery: draft?.gallery ?? product.gallery,
        video_en: draft?.video_en ?? product.video_en ?? '',
        video_id: draft?.video_id ?? product.video_id ?? '',
        video_pt: draft?.video_pt ?? product.video_pt ?? '',
        translations: Object.fromEntries(
            locales.map((locale) => [locale, translation(locale)]),
        ) as Record<string, Translation>,
    });
    const setTranslation = (
        locale: string,
        field: keyof Translation,
        value: string | string[],
    ) =>
        form.setData('translations', {
            ...form.data.translations,
            [locale]: { ...form.data.translations[locale], [field]: value },
        });
    return (
        <EditorShell
            title={`Product: ${product.slug}`}
            description="Maintain localized product details and media URLs as a draft."
        >
            <Card>
                <CardContent className="space-y-6 pt-6">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            form.put(update.url(product.slug));
                        }}
                        className="space-y-6"
                    >
                        <label className="grid gap-2">
                            Gallery URLs, one per line
                            <textarea
                                className="min-h-24 rounded-md border bg-background p-3"
                                value={form.data.gallery.join('\n')}
                                onChange={(event) =>
                                    form.setData(
                                        'gallery',
                                        event.target.value
                                            .split('\n')
                                            .map((line) => line.trim())
                                            .filter(Boolean),
                                    )
                                }
                            />
                        </label>
                        <div className="grid gap-3 md:grid-cols-3">
                            {locales.map((locale) => (
                                <Input
                                    key={locale}
                                    aria-label={`${locale} video URL`}
                                    placeholder={`${locale.toUpperCase()} video URL`}
                                    value={form.data[`video_${locale}`]}
                                    onChange={(event) =>
                                        form.setData(
                                            `video_${locale}`,
                                            event.target.value,
                                        )
                                    }
                                />
                            ))}
                        </div>
                        {locales.map((locale) => (
                            <fieldset
                                key={locale}
                                className="grid gap-3 rounded-lg border p-4"
                            >
                                <legend className="px-2 font-semibold uppercase">
                                    {locale}
                                </legend>
                                <Input
                                    aria-label={`${locale} title`}
                                    value={form.data.translations[locale].title}
                                    onChange={(event) =>
                                        setTranslation(
                                            locale,
                                            'title',
                                            event.target.value,
                                        )
                                    }
                                />
                                <textarea
                                    aria-label={`${locale} body`}
                                    className="min-h-32 rounded-md border bg-background p-3"
                                    value={form.data.translations[locale].body}
                                    onChange={(event) =>
                                        setTranslation(
                                            locale,
                                            'body',
                                            event.target.value,
                                        )
                                    }
                                />
                                <Input
                                    aria-label={`${locale} capacity`}
                                    value={
                                        form.data.translations[locale]
                                            .capacity ?? ''
                                    }
                                    onChange={(event) =>
                                        setTranslation(
                                            locale,
                                            'capacity',
                                            event.target.value,
                                        )
                                    }
                                />
                                <textarea
                                    aria-label={`${locale} products`}
                                    className="min-h-24 rounded-md border bg-background p-3"
                                    value={(
                                        form.data.translations[locale]
                                            .products ?? []
                                    ).join('\n')}
                                    onChange={(event) =>
                                        setTranslation(
                                            locale,
                                            'products',
                                            event.target.value
                                                .split('\n')
                                                .map((line) => line.trim())
                                                .filter(Boolean),
                                        )
                                    }
                                />
                                <textarea
                                    aria-label={`${locale} machinery`}
                                    className="min-h-24 rounded-md border bg-background p-3"
                                    value={
                                        form.data.translations[locale]
                                            .machinery ?? ''
                                    }
                                    onChange={(event) =>
                                        setTranslation(
                                            locale,
                                            'machinery',
                                            event.target.value,
                                        )
                                    }
                                />
                            </fieldset>
                        ))}
                        <Button disabled={form.processing}>Save draft</Button>
                    </form>
                    {auth.user.role === 'ADMIN' && (
                        <Button
                            variant="secondary"
                            onClick={() =>
                                form.post(
                                    ProductPublicationController.url(
                                        product.slug,
                                    ),
                                )
                            }
                        >
                            Publish
                        </Button>
                    )}
                </CardContent>
            </Card>
        </EditorShell>
    );
}
