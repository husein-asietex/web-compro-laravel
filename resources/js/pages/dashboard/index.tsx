import { Head, Link } from '@inertiajs/react';
import {
    FileText,
    Images,
    LayoutDashboard,
    Package,
    Users,
} from 'lucide-react';
import ContentLibraryController from '@/actions/App/Http/Controllers/Dashboard/ContentLibraryController';
import MediaAssetController from '@/actions/App/Http/Controllers/Dashboard/MediaAssetController';
import UserController from '@/actions/App/Http/Controllers/Dashboard/UserController';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard-layout';
import type { DashboardStats } from '@/types';

type Props = { stats: DashboardStats };

type StatCardProps = {
    icon: React.ElementType;
    title: string;
    total: number;
    published?: number;
    draft?: number;
    approved?: number;
    pending?: number;
    active?: number;
    href?: string;
};

function StatCard({
    icon: Icon,
    title,
    total,
    published,
    draft,
    approved,
    pending,
    active,
    href,
}: StatCardProps) {
    const inner = (
        <Card className="shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardDescription className="text-xs font-semibold tracking-[0.12em] uppercase">
                        {title}
                    </CardDescription>
                    <Icon
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                    />
                </div>
                <CardTitle className="text-3xl font-bold">{total}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {published !== undefined && (
                    <Badge variant="secondary" className="font-normal">
                        {published} published
                    </Badge>
                )}
                {draft !== undefined && (
                    <Badge variant="outline" className="font-normal">
                        {draft} draft
                    </Badge>
                )}
                {approved !== undefined && (
                    <Badge variant="secondary" className="font-normal">
                        {approved} approved
                    </Badge>
                )}
                {pending !== undefined && pending > 0 && (
                    <Badge variant="destructive" className="font-normal">
                        {pending} pending
                    </Badge>
                )}
                {active !== undefined && (
                    <Badge variant="secondary" className="font-normal">
                        {active} active
                    </Badge>
                )}
            </CardContent>
        </Card>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="block focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-ring"
            >
                {inner}
            </Link>
        );
    }

    return inner;
}

export default function Dashboard({ stats }: Props) {
    const contentUrl = ContentLibraryController.index.url();
    return (
        <DashboardLayout>
            <Head>
                <title>Dashboard</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className="mb-8">
                <p className="text-text-accent text-sm font-semibold tracking-[0.16em] uppercase">
                    Workspace
                </p>
                <h1 className="mt-2 font-heading text-4xl tracking-tight">
                    Dashboard
                </h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    icon={FileText}
                    title="Pages"
                    href={contentUrl}
                    total={stats.pages.total}
                    published={stats.pages.published}
                    draft={stats.pages.draft}
                />
                <StatCard
                    icon={Package}
                    title="Products"
                    href={contentUrl}
                    total={stats.products.total}
                    published={stats.products.published}
                    draft={stats.products.draft}
                />
                <StatCard
                    icon={LayoutDashboard}
                    title="Collections"
                    href={contentUrl}
                    total={stats.collections.total}
                    published={stats.collections.published}
                />
                <StatCard
                    icon={Images}
                    title="Media"
                    href={MediaAssetController.index.url()}
                    total={stats.media.total}
                    approved={stats.media.approved}
                    pending={stats.media.pending}
                />
                <StatCard
                    icon={Users}
                    title="Users"
                    href={UserController.index.url()}
                    total={stats.users.total}
                    active={stats.users.active}
                />
            </div>
        </DashboardLayout>
    );
}
