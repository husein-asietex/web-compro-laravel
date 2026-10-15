import { useForm, usePage } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Dashboard/MediaAssetController';
import MediaApprovalController from '@/actions/App/Http/Controllers/Dashboard/MediaApprovalController';
import EditorShell from '@/components/dashboard/editor-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Media = {
    id: number;
    url: string;
    alt_en: string;
    approved: boolean;
    page?: { slug: string };
    product?: { slug: string };
};
export default function MediaIndex({ media }: { media: Media[] }) {
    const auth = usePage<{ auth: { user: { role: string } } }>().props.auth;
    const form = useForm({
        url: '',
        alt_en: '',
        alt_id: '',
        alt_pt: '',
        credit: '',
        page_id: null as number | null,
        product_id: null as number | null,
    });
    return (
        <EditorShell
            title="Media library"
            description="Register HTTPS media URLs and approve them before public use."
        >
            <Card>
                <CardContent className="pt-6">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            form.post(store.url(), {
                                onSuccess: () => form.reset(),
                            });
                        }}
                        className="grid gap-3 md:grid-cols-2"
                    >
                        <Input
                            aria-label="Media URL"
                            placeholder="HTTPS URL"
                            value={form.data.url}
                            onChange={(event) =>
                                form.setData('url', event.target.value)
                            }
                        />
                        {(['en', 'id', 'pt'] as const).map((locale) => (
                            <Input
                                key={locale}
                                aria-label={`${locale} alt text`}
                                placeholder={`${locale.toUpperCase()} alt text`}
                                value={form.data[`alt_${locale}`]}
                                onChange={(event) =>
                                    form.setData(
                                        `alt_${locale}`,
                                        event.target.value,
                                    )
                                }
                            />
                        ))}
                        <Button disabled={form.processing}>Add media</Button>
                    </form>
                </CardContent>
            </Card>
            <div className="grid gap-3">
                {media.map((asset) => (
                    <Card key={asset.id}>
                        <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
                            <div className="min-w-0">
                                <p className="truncate font-medium">
                                    {asset.alt_en}
                                </p>
                                <a
                                    href={asset.url}
                                    className="block truncate text-sm text-muted-foreground underline"
                                >
                                    {asset.url}
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant={
                                        asset.approved ? 'secondary' : 'outline'
                                    }
                                >
                                    {asset.approved ? 'Approved' : 'Pending'}
                                </Badge>
                                {!asset.approved &&
                                    auth.user.role === 'ADMIN' && (
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                form.post(
                                                    MediaApprovalController.url(
                                                        asset.id,
                                                    ),
                                                )
                                            }
                                        >
                                            Approve
                                        </Button>
                                    )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </EditorShell>
    );
}
