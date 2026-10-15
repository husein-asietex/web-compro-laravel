<?php

namespace App\Support;

class PublicSeo
{
    /**
     * @param  array<string, mixed>  $structuredData
     * @param  array<string, string>  $routeParameters
     * @return array<string, mixed>
     */
    public function page(string $locale, string $routeName, string $title, string $description, array $routeParameters = [], array $structuredData = []): array
    {
        $canonical = route($routeName, ['locale' => $locale, ...$routeParameters]);
        $alternates = collect(['en', 'id', 'pt'])
            ->mapWithKeys(fn (string $alternateLocale): array => [
                $alternateLocale => route($routeName, ['locale' => $alternateLocale, ...$routeParameters]),
            ])
            ->all();

        return [
            'title' => $title,
            'description' => str($description)->squish()->limit(160)->toString(),
            'canonical' => $canonical,
            'alternates' => [...$alternates, 'x-default' => $alternates['en']],
            'structuredData' => $structuredData ?: [
                '@context' => 'https://schema.org',
                '@type' => 'WebPage',
                'name' => $title,
                'url' => $canonical,
                'inLanguage' => $locale,
            ],
        ];
    }

    /** @return array<string, mixed> */
    public function organization(string $locale, string $url): array
    {
        return ['@context' => 'https://schema.org', '@type' => 'Organization', 'name' => 'PT Asietex Sinar Indopratama', 'url' => $url, 'inLanguage' => $locale];
    }

    /** @return array<string, mixed> */
    public function product(string $locale, string $url, string $name, string $description, ?string $image): array
    {
        return array_filter([
            '@context' => 'https://schema.org', '@type' => 'Product', 'name' => $name,
            'description' => str($description)->squish()->limit(500)->toString(), 'url' => $url,
            'image' => $image, 'inLanguage' => $locale, 'brand' => ['@type' => 'Brand', 'name' => 'Asietex'],
        ], fn (mixed $value): bool => $value !== null);
    }
}
