import { useForm, usePage } from '@inertiajs/react';
import { update } from '@/actions/App/Http/Controllers/Dashboard/PageController';
import PagePublicationController from '@/actions/App/Http/Controllers/Dashboard/PagePublicationController';
import EditorShell from '@/components/dashboard/editor-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Translation = { locale: string; title: string; body: string };
type PageData = {
    slug: string;
    draft: Record<string, Omit<Translation, 'locale'>> | null;
    translations: Translation[];
};
const locales = ['en', 'id', 'pt'] as const;

export function PageEditor({ page }: { page: PageData }) {
    const auth = usePage<{ auth: { user: { role: string } } }>().props.auth;
    const value = (locale: string) =>
        page.draft?.[locale] ??
        page.translations.find((item) => item.locale === locale) ?? {
            title: '',
            body: '',
        };
    const form = useForm({
        translations: Object.fromEntries(
            locales.map((locale) => [locale, value(locale)]),
        ) as Record<string, { title: string; body: string }>,
    });
    return (
        <EditorShell
            title={`Page: ${page.slug}`}
            description="Save a multilingual draft, then let an administrator publish it atomically."
        >
            <Card>
                <CardContent className="space-y-6 pt-6">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            form.put(update.url(page.slug));
                        }}
                        className="space-y-6"
                    >
                        {locales.map((locale) => (
                            <fieldset
                                key={locale}
                                className="space-y-3 rounded-lg border p-4"
                            >
                                <legend className="px-2 font-semibold uppercase">
                                    {locale}
                                </legend>
                                <Input
                                    aria-label={`${locale} title`}
                                    value={form.data.translations[locale].title}
                                    onChange={(event) =>
                                        form.setData('translations', {
                                            ...form.data.translations,
                                            [locale]: {
                                                ...form.data.translations[
                                                    locale
                                                ],
                                                title: event.target.value,
                                            },
                                        })
                                    }
                                />
                                <textarea
                                    aria-label={`${locale} body`}
                                    className="min-h-40 w-full rounded-md border bg-background p-3"
                                    value={form.data.translations[locale].body}
                                    onChange={(event) =>
                                        form.setData('translations', {
                                            ...form.data.translations,
                                            [locale]: {
                                                ...form.data.translations[
                                                    locale
                                                ],
                                                body: event.target.value,
                                            },
                                        })
                                    }
                                />
                            </fieldset>
                        ))}
                        <Button disabled={form.processing}>Save draft</Button>
                    </form>
                    {auth.user.role === 'ADMIN' && (
                        <Button
                            variant="secondary"
                            onClick={() =>
                                form.post(
                                    PagePublicationController.url(page.slug),
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

export default PageEditor;
