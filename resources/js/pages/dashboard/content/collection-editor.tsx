import { useForm, usePage } from '@inertiajs/react';
import { update } from '@/actions/App/Http/Controllers/Dashboard/ContentCollectionController';
import ContentCollectionPublicationController from '@/actions/App/Http/Controllers/Dashboard/ContentCollectionPublicationController';
import EditorShell from '@/components/dashboard/editor-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Collection = {
    key: string;
    data: Record<string, unknown>;
    draft: Record<string, unknown> | null;
};
export default function CollectionEditor({
    collection,
}: {
    collection: Collection;
}) {
    const auth = usePage<{ auth: { user: { role: string } } }>().props.auth;
    const form = useForm({
        data: JSON.stringify(collection.draft ?? collection.data, null, 2),
    });
    const save = (event: React.FormEvent) => {
        event.preventDefault();
        let parsed: Record<string, unknown>;
        try {
            parsed = JSON.parse(form.data.data) as Record<string, unknown>;
        } catch {
            form.setError('data', 'Enter valid JSON.');
            return;
        }
        form.transform(() => ({ data: parsed }));
        form.put(update.url(collection.key));
    };
    return (
        <EditorShell
            title={`Collection: ${collection.key}`}
            description="Edit structured collection data as JSON."
        >
            <Card>
                <CardContent className="space-y-4 pt-6">
                    <form onSubmit={save} className="space-y-3">
                        <textarea
                            aria-label="Collection JSON"
                            className="min-h-96 w-full rounded-md border bg-background p-3 font-mono text-sm"
                            value={form.data.data}
                            onChange={(event) =>
                                form.setData('data', event.target.value)
                            }
                        />
                        {form.errors.data && (
                            <p className="text-sm text-destructive">
                                {form.errors.data}
                            </p>
                        )}
                        <Button disabled={form.processing}>Save draft</Button>
                    </form>
                    {auth.user.role === 'ADMIN' && (
                        <Button
                            variant="secondary"
                            onClick={() =>
                                form.post(
                                    ContentCollectionPublicationController.url(
                                        collection.key,
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
