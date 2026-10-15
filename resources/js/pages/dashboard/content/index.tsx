import { Head, Link } from '@inertiajs/react';
import { FileText, Package, BookOpen } from 'lucide-react';
import { edit as editCollection } from '@/actions/App/Http/Controllers/Dashboard/ContentCollectionController';
import { edit as editPage } from '@/actions/App/Http/Controllers/Dashboard/PageController';
import { edit as editProduct } from '@/actions/App/Http/Controllers/Dashboard/ProductController';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import DashboardLayout from '@/layouts/dashboard-layout';
import type {
    CollectionListItem,
    ContentStatus,
    PageListItem,
    ProductListItem,
} from '@/types';

type Props = {
    pages: PageListItem[];
    products: ProductListItem[];
    collections: CollectionListItem[];
};

function StatusBadge({ status }: { status: ContentStatus }) {
    return status === 'PUBLISHED' ? (
        <Badge variant="secondary" className="font-normal">
            Published
        </Badge>
    ) : (
        <Badge variant="outline" className="font-normal text-muted-foreground">
            Draft
        </Badge>
    );
}

const editLinkClass =
    'inline-flex h-7 items-center rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

export default function ContentLibrary({
    pages,
    products,
    collections,
}: Props) {
    return (
        <DashboardLayout>
            <Head>
                <title>Content Library — Dashboard</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className="mb-8">
                <p className="text-text-accent text-sm font-semibold tracking-[0.16em] uppercase">
                    Content
                </p>
                <h1 className="mt-2 font-heading text-4xl tracking-tight">
                    Content Library
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Manage pages, products, and content collections.
                </p>
            </div>

            <div className="space-y-8">
                {/* Pages */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-3 pb-4">
                        <FileText
                            className="size-5 text-muted-foreground"
                            aria-hidden="true"
                        />
                        <div>
                            <CardTitle>Pages</CardTitle>
                            <CardDescription>
                                CMS-managed static pages
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last updated</TableHead>
                                    <TableHead className="w-24 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pages.map((page) => (
                                    <TableRow key={page.id}>
                                        <TableCell className="font-mono text-sm">
                                            {page.slug}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={page.status} />
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {page.updated_at_display ?? '—'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                href={editPage.url(page.slug)}
                                                className={editLinkClass}
                                                aria-label={`Edit page ${page.slug}`}
                                            >
                                                Edit
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {pages.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="text-center text-muted-foreground"
                                        >
                                            No pages found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Products */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-3 pb-4">
                        <Package
                            className="size-5 text-muted-foreground"
                            aria-hidden="true"
                        />
                        <div>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>
                                Division/product catalog entries
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-14">
                                        Order
                                    </TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last updated</TableHead>
                                    <TableHead className="w-24 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="text-muted-foreground">
                                            {product.sort_order}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">
                                            {product.slug}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge
                                                status={product.status}
                                            />
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {product.updated_at_display ?? '—'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                href={editProduct.url(
                                                    product.slug,
                                                )}
                                                className={editLinkClass}
                                                aria-label={`Edit product ${product.slug}`}
                                            >
                                                Edit
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {products.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-center text-muted-foreground"
                                        >
                                            No products found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Collections */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-3 pb-4">
                        <BookOpen
                            className="size-5 text-muted-foreground"
                            aria-hidden="true"
                        />
                        <div>
                            <CardTitle>Collections</CardTitle>
                            <CardDescription>
                                Structured content datasets
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Key</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last updated</TableHead>
                                    <TableHead className="w-24 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {collections.map((collection) => (
                                    <TableRow key={collection.key}>
                                        <TableCell className="font-mono text-sm">
                                            {collection.key}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge
                                                status={collection.status}
                                            />
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {collection.updated_at_display ??
                                                '—'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                href={editCollection.url(
                                                    collection.key,
                                                )}
                                                className={editLinkClass}
                                                aria-label={`Edit collection ${collection.key}`}
                                            >
                                                Edit
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {collections.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="text-center text-muted-foreground"
                                        >
                                            No collections found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
