import { Head } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';

export default function EditorShell({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout>
            <Head>
                <title>{title} — Dashboard</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className="mx-auto max-w-4xl space-y-6">
                <div>
                    <p className="text-text-accent text-sm font-semibold tracking-[0.16em] uppercase">
                        CMS
                    </p>
                    <h1 className="mt-2 font-heading text-4xl">{title}</h1>
                    <p className="mt-2 text-muted-foreground">{description}</p>
                </div>
                {children}
            </div>
        </DashboardLayout>
    );
}
