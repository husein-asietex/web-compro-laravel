import { useForm } from '@inertiajs/react';
import { update } from '@/actions/App/Http/Controllers/Dashboard/AccountController';
import EditorShell from '@/components/dashboard/editor-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AccountEdit() {
    const form = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    return (
        <EditorShell
            title="Account & password"
            description="Change your password and invalidate your other sessions."
        >
            <Card>
                <CardContent className="pt-6">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            form.put(update.url(), {
                                onSuccess: () => form.reset(),
                            });
                        }}
                        className="grid max-w-xl gap-4"
                    >
                        <Input
                            aria-label="Current password"
                            type="password"
                            value={form.data.current_password}
                            onChange={(event) =>
                                form.setData(
                                    'current_password',
                                    event.target.value,
                                )
                            }
                        />
                        <Input
                            aria-label="New password"
                            type="password"
                            value={form.data.password}
                            onChange={(event) =>
                                form.setData('password', event.target.value)
                            }
                        />
                        <Input
                            aria-label="Confirm password"
                            type="password"
                            value={form.data.password_confirmation}
                            onChange={(event) =>
                                form.setData(
                                    'password_confirmation',
                                    event.target.value,
                                )
                            }
                        />
                        <Button disabled={form.processing}>
                            Change password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </EditorShell>
    );
}
