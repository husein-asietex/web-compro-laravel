import { Form, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';

export default function Login() {
    return (
        <AuthLayout>
            <Head>
                <title>Sign in</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Card>
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>
                        Use your active staff or administrator account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...store.form()} resetOnError={['password']}>
                        {({ errors, processing }) => (
                            <FieldGroup>
                                <Field data-invalid={Boolean(errors.email)}>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        autoFocus
                                        aria-invalid={Boolean(errors.email)}
                                        disabled={processing}
                                    />
                                    {errors.email && (
                                        <FieldDescription role="alert">
                                            {errors.email}
                                        </FieldDescription>
                                    )}
                                </Field>
                                <Field data-invalid={Boolean(errors.password)}>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        aria-invalid={Boolean(errors.password)}
                                        disabled={processing}
                                    />
                                    {errors.password && (
                                        <FieldDescription role="alert">
                                            {errors.password}
                                        </FieldDescription>
                                    )}
                                </Field>
                                <Field>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full"
                                    >
                                        {processing ? 'Signing in…' : 'Sign in'}
                                    </Button>
                                    <FieldDescription>
                                        Public registration is not available.
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
