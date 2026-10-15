import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { home } from '@/routes';

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <main className="grid min-h-screen place-items-center bg-muted/40 px-6 py-12">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link
                    href={home()}
                    className="self-center font-heading text-xl font-semibold"
                >
                    Asietex
                </Link>
                {children}
            </div>
        </main>
    );
}
