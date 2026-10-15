import { Form, Link, usePage } from '@inertiajs/react';
import {
    FileText,
    Images,
    LayoutDashboard,
    LogOut,
    Menu,
    UserRound,
    Users,
    X,
} from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import AccountController from '@/actions/App/Http/Controllers/Dashboard/AccountController';
import ContentLibraryController from '@/actions/App/Http/Controllers/Dashboard/ContentLibraryController';
import DashboardController from '@/actions/App/Http/Controllers/Dashboard/DashboardController';
import MediaAssetController from '@/actions/App/Http/Controllers/Dashboard/MediaAssetController';
import RevisionController from '@/actions/App/Http/Controllers/Dashboard/RevisionController';
import SiteSettingController from '@/actions/App/Http/Controllers/Dashboard/SiteSettingController';
import UserController from '@/actions/App/Http/Controllers/Dashboard/UserController';
import { home, logout } from '@/routes';

const navigation = [
    {
        href: DashboardController.url(),
        label: 'Overview',
        icon: LayoutDashboard,
    },
    {
        href: ContentLibraryController.index.url(),
        label: 'Content',
        icon: FileText,
    },
    {
        href: SiteSettingController.edit.url('site'),
        label: 'Settings',
        icon: FileText,
    },
    { href: MediaAssetController.index.url(), label: 'Media', icon: Images },
    {
        href: UserController.index.url(),
        label: 'People',
        icon: Users,
        adminOnly: true,
    },
    { href: RevisionController.url(), label: 'Revisions', icon: FileText },
    {
        href: AccountController.edit.url(),
        label: 'My account',
        icon: UserRound,
    },
] as const;

export default function DashboardLayout({ children }: PropsWithChildren) {
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const { auth, url } = usePage().props;
    const isAdmin = auth.user?.role === 'ADMIN';
    const visibleNavigation = navigation.filter(
        (item) => isAdmin || !('adminOnly' in item && item.adminOnly),
    );

    return (
        <div className="min-h-screen bg-muted/45">
            <a
                href="#dashboard-content"
                className="fixed top-3 left-4 z-50 -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus-visible:translate-y-0"
            >
                Skip to content
            </a>
            <div className="lg:grid lg:min-h-screen lg:grid-cols-[17rem_minmax(0,1fr)]">
                <aside
                    className={`${isNavigationOpen ? 'block' : 'hidden'} border-b border-border bg-background lg:block lg:border-r lg:border-b-0`}
                    aria-label="CMS navigation"
                >
                    <div className="flex h-17 items-center justify-between border-b border-border px-5">
                        <Link
                            href={home()}
                            className="font-heading text-xl focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                        >
                            Asietex
                            <span className="text-text-accent"> CMS</span>
                        </Link>
                        <button
                            type="button"
                            className="inline-flex size-10 items-center justify-center rounded-md hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
                            aria-label="Close CMS navigation"
                            onClick={() => setIsNavigationOpen(false)}
                        >
                            <X aria-hidden="true" />
                        </button>
                    </div>
                    <nav className="grid gap-1 p-3" aria-label="CMS sections">
                        <p className="px-3 pt-3 pb-2 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                            Workspace
                        </p>
                        {visibleNavigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = url === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsNavigationOpen(false)}
                                    className={`flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/65 hover:text-foreground'}`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <Icon
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="border-t border-border p-4">
                        <p className="mb-3 px-1 text-xs text-muted-foreground">
                            {isAdmin ? 'Admin workspace' : 'Staff workspace'}
                        </p>
                        <Form {...logout.form()}>
                            {({ processing }) => (
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50"
                                >
                                    <LogOut
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                    {processing ? 'Signing out…' : 'Sign out'}
                                </button>
                            )}
                        </Form>
                    </div>
                </aside>
                <div className="min-w-0">
                    <header className="sticky top-0 z-20 flex h-17 items-center border-b border-border bg-background/95 px-5 backdrop-blur md:px-8">
                        <button
                            type="button"
                            className="mr-3 inline-flex size-11 items-center justify-center rounded-md hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
                            aria-label="Open CMS navigation"
                            aria-expanded={isNavigationOpen}
                            onClick={() => setIsNavigationOpen(true)}
                        >
                            <Menu aria-hidden="true" />
                        </button>
                        <p className="text-sm text-muted-foreground">
                            Content management workspace
                        </p>
                    </header>
                    <main
                        id="dashboard-content"
                        className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-12"
                    >
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
