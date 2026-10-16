import { Head, Link } from '@inertiajs/react';
import { home } from '@/routes';
import { buttonVariants } from '@/components/ui/button';

const messages: Record<number, { title: string; description: string }> = {
    403: {
        title: 'Forbidden',
        description: 'You do not have permission to access this page.',
    },
    404: {
        title: 'Page not found',
        description: 'The page you requested could not be found.',
    },
    500: {
        title: 'Server error',
        description: 'An unexpected error occurred. Please try again later.',
    },
    503: {
        title: 'Service unavailable',
        description: 'The service is temporarily unavailable.',
    },
};

export default function ErrorPage({ status }: { status: number }) {
    const message = messages[status] ?? messages[500]!;

    return (
        <main className="grid min-h-screen place-items-center bg-background px-6 text-foreground">
            <Head title={message.title} />
            <div className="flex max-w-xl flex-col gap-5 text-center">
                <p className="text-text-accent text-xs font-semibold tracking-[.16em] uppercase">
                    Error {status}
                </p>
                <h1 className="font-heading text-6xl leading-none tracking-[-.04em] md:text-8xl">
                    {message.title}
                </h1>
                <p className="text-muted-foreground">{message.description}</p>
                <Link
                    href={home()}
                    className={buttonVariants({
                        size: 'lg',
                        className: 'mt-3 self-center',
                    })}
                >
                    Return home
                </Link>
            </div>
        </main>
    );
}
