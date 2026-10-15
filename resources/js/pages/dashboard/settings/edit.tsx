import { useForm, usePage } from '@inertiajs/react';
import { update } from '@/actions/App/Http/Controllers/Dashboard/SiteSettingController';
import SiteSettingPublicationController from '@/actions/App/Http/Controllers/Dashboard/SiteSettingPublicationController';
import EditorShell from '@/components/dashboard/editor-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Setting = {
    id: string;
    catalog_url: string;
    catalog_on: boolean;
    catalog_label_en: string;
    catalog_label_id: string;
    catalog_label_pt: string;
    catalog_placements: string[];
    catalog_open_new_tab: boolean;
    draft: Partial<Setting> | null;
};
export default function SettingsEditor({ setting }: { setting: Setting }) {
    const auth = usePage<{ auth: { user: { role: string } } }>().props.auth;
    const value = { ...setting, ...setting.draft };
    const form = useForm({
        catalog_url: value.catalog_url,
        catalog_on: value.catalog_on,
        catalog_label_en: value.catalog_label_en,
        catalog_label_id: value.catalog_label_id,
        catalog_label_pt: value.catalog_label_pt,
        catalog_placements: value.catalog_placements,
        catalog_open_new_tab: value.catalog_open_new_tab,
    });
    return (
        <EditorShell
            title="Site & e-catalog settings"
            description="Staff can save a draft; administrators can publish it."
        >
            <Card>
                <CardContent className="pt-6">
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            form.put(update.url(setting.id));
                        }}
                        className="grid gap-4"
                    >
                        <Input
                            aria-label="Catalog URL"
                            value={form.data.catalog_url}
                            onChange={(event) =>
                                form.setData('catalog_url', event.target.value)
                            }
                        />
                        {(['en', 'id', 'pt'] as const).map((locale) => (
                            <Input
                                key={locale}
                                aria-label={`${locale} catalog label`}
                                value={form.data[`catalog_label_${locale}`]}
                                onChange={(event) =>
                                    form.setData(
                                        `catalog_label_${locale}`,
                                        event.target.value,
                                    )
                                }
                            />
                        ))}
                        <div className="flex flex-wrap gap-4">
                            {['home', 'product', 'footer'].map((placement) => (
                                <label key={placement} className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        checked={form.data.catalog_placements.includes(
                                            placement,
                                        )}
                                        onChange={(event) =>
                                            form.setData(
                                                'catalog_placements',
                                                event.target.checked
                                                    ? [
                                                          ...form.data
                                                              .catalog_placements,
                                                          placement,
                                                      ]
                                                    : form.data.catalog_placements.filter(
                                                          (item) =>
                                                              item !==
                                                              placement,
                                                      ),
                                            )
                                        }
                                    />
                                    {placement}
                                </label>
                            ))}
                        </div>
                        <label className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={form.data.catalog_on}
                                onChange={(event) =>
                                    form.setData(
                                        'catalog_on',
                                        event.target.checked,
                                    )
                                }
                            />
                            Catalog enabled
                        </label>
                        <label className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={form.data.catalog_open_new_tab}
                                onChange={(event) =>
                                    form.setData(
                                        'catalog_open_new_tab',
                                        event.target.checked,
                                    )
                                }
                            />
                            Open in new tab
                        </label>
                        <Button disabled={form.processing}>Save draft</Button>
                    </form>
                    {auth.user.role === 'ADMIN' && (
                        <Button
                            className="mt-4"
                            variant="secondary"
                            onClick={() =>
                                form.post(
                                    SiteSettingPublicationController.url(
                                        setting.id,
                                    ),
                                )
                            }
                        >
                            Publish settings
                        </Button>
                    )}
                </CardContent>
            </Card>
        </EditorShell>
    );
}
