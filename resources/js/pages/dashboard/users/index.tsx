import { useForm, usePage } from '@inertiajs/react';
import {
    store,
    update,
} from '@/actions/App/Http/Controllers/Dashboard/UserController';
import UserActivationController from '@/actions/App/Http/Controllers/Dashboard/UserActivationController';
import EditorShell from '@/components/dashboard/editor-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type User = {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'STAFF';
    active: boolean;
};

export default function UsersIndex({ users }: { users: User[] }) {
    const current = usePage<{ auth: { user: User } }>().props.auth.user;
    const form = useForm({
        name: '',
        email: '',
        password: '',
        role: 'STAFF' as 'ADMIN' | 'STAFF',
    });
    const changeRole = (user: User) => {
        form.transform(() => ({
            role: user.role === 'ADMIN' ? 'STAFF' : 'ADMIN',
        }));
        form.put(update.url(user.id));
    };
    const changeActivation = (user: User) => {
        form.transform(() => ({ active: !user.active }));
        form.patch(UserActivationController.url(user.id));
    };

    return (
        <EditorShell
            title="User management"
            description="Create staff accounts and enforce roles on the server."
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
                        className="grid gap-3 md:grid-cols-4"
                    >
                        <Input
                            aria-label="Name"
                            placeholder="Name"
                            value={form.data.name}
                            onChange={(event) =>
                                form.setData('name', event.target.value)
                            }
                        />
                        <Input
                            aria-label="Email"
                            placeholder="Email"
                            value={form.data.email}
                            onChange={(event) =>
                                form.setData('email', event.target.value)
                            }
                        />
                        <Input
                            aria-label="Password"
                            type="password"
                            placeholder="Temporary password"
                            value={form.data.password}
                            onChange={(event) =>
                                form.setData('password', event.target.value)
                            }
                        />
                        <select
                            aria-label="Role"
                            className="rounded-md border bg-background px-3"
                            value={form.data.role}
                            onChange={(event) =>
                                form.setData(
                                    'role',
                                    event.target.value as 'ADMIN' | 'STAFF',
                                )
                            }
                        >
                            <option>STAFF</option>
                            <option>ADMIN</option>
                        </select>
                        <Button disabled={form.processing}>Create user</Button>
                    </form>
                </CardContent>
            </Card>
            <div className="grid gap-3">
                {users.map((user) => (
                    <Card key={user.id}>
                        <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">{user.role}</Badge>
                                <Badge
                                    variant={
                                        user.active
                                            ? 'secondary'
                                            : 'destructive'
                                    }
                                >
                                    {user.active ? 'Active' : 'Inactive'}
                                </Badge>
                                {user.id !== current.id && (
                                    <>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => changeRole(user)}
                                        >
                                            {user.role === 'ADMIN'
                                                ? 'Make staff'
                                                : 'Make admin'}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                changeActivation(user)
                                            }
                                        >
                                            {user.active
                                                ? 'Deactivate'
                                                : 'Activate'}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </EditorShell>
    );
}
