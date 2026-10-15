export type ContentStatus = 'DRAFT' | 'PUBLISHED';

export type PageListItem = {
    id: number;
    slug: string;
    status: ContentStatus;
    updated_at: string | null;
    updated_at_display: string | null;
};

export type ProductListItem = {
    id: number;
    slug: string;
    sort_order: number;
    status: ContentStatus;
    updated_at: string | null;
    updated_at_display: string | null;
};

export type CollectionListItem = {
    key: string;
    status: ContentStatus;
    updated_at: string | null;
    updated_at_display: string | null;
};

export type DashboardStats = {
    pages: { total: number; published: number; draft: number };
    products: { total: number; published: number; draft: number };
    collections: { total: number; published: number };
    media: { total: number; approved: number; pending: number };
    users: { total: number; active: number };
};
