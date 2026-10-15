import { Head, Link } from '@inertiajs/react';
import { home } from '@/routes';

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
            <div className="flex max-w-md flex-col gap-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                    Error {status}
                </p>
                <h1 className="font-heading text-3xl font-semibold">
                    {message.title}
                </h1>
                <p className="text-muted-foreground">{message.description}</p>
                <Link
                    href={home()}
                    className="self-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                    Return home
                </Link>
            </div>
        </main>
    );
}
