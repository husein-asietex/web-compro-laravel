import EditorShell from '@/components/dashboard/editor-shell';
import { Card, CardContent } from '@/components/ui/card';
type Revision = {
    id: number;
    entity: string;
    entity_id: string;
    action: string;
    created_at: string;
    created_at_display: string | null;
    user: { name: string; email: string };
};
export default function RevisionIndex({
    revisions,
}: {
    revisions: Revision[];
}) {
    return (
        <EditorShell
            title="Revision log"
            description="The 100 most recent CMS and account mutations."
        >
            <div className="grid gap-3">
                {revisions.map((revision) => (
                    <Card key={revision.id}>
                        <CardContent className="flex flex-wrap justify-between gap-3 pt-6">
                            <div>
                                <p className="font-medium">
                                    {revision.entity} · {revision.entity_id}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {revision.action} by {revision.user.name}
                                </p>
                            </div>
                            <time className="text-sm text-muted-foreground">
                                {revision.created_at_display ?? '—'}
                            </time>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </EditorShell>
    );
}
