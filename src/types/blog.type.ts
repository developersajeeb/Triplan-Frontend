export type BlogStatus = 'published' | 'draft';

export interface IBlogListItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: BlogStatus;
  featureImage: string;
  excerpt: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlog extends IBlogListItem {
  content: string;
}
