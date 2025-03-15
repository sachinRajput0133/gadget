export interface Review {
  id: string;
  title: string;
  content: string;
  slug: string;
  rating: number;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  excerpt: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  specifications?: Record<string, string>;
  pros?: string[];
  cons?: string[];
}

export interface PaginatedReviews {
  data: Review[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
