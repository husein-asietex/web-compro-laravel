export type Locale = 'en' | 'id' | 'pt';

export type Seo = {
    title: string;
    description: string;
    canonical: string;
    alternates: Record<Locale | 'x-default', string>;
    structuredData: Record<string, unknown>;
};

export type PublicPage = {
    slug: string;
    title: string;
    body: string;
    media: Array<{ url: string; alt: string; width: number; height: number }>;
};

export type PublicProduct = {
    slug: string;
    title: string;
    body: string;
    capacity: string | null;
    products: string[];
    machinery: string | null;
    image: {
        url: string;
        alt: string;
        width: number;
        height: number;
    } | null;
};

export type Catalog = {
    url: string;
    label: string;
    newTab: boolean;
} | null;
