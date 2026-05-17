import ImageWaterMark from '@/assets/images/image-watermark.webp';

export type BlogStatus = 'published' | 'draft';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: BlogStatus;
  featureImage: string;
  content: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
};

export const BLOG_CATEGORIES = ['General', 'Travel Tips', 'Destinations', 'Guides', 'News'];

const STORAGE_KEY = 'triplan-admin-blogs';

const fallbackExcerpt = (content: string) => {
  const plainText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  if (!plainText) {
    return 'No excerpt available.';
  }

  return plainText.length > 160 ? `${plainText.slice(0, 160).trim()}...` : plainText;
};

export const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `blog-${Date.now()}`;
};

export const formatBlogDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const makeBlog = (
  blog: Omit<BlogPost, 'slug' | 'excerpt' | 'createdAt' | 'updatedAt'> & Partial<Pick<BlogPost, 'slug' | 'excerpt' | 'createdAt' | 'updatedAt'>>,
): BlogPost => ({
  ...blog,
  slug: blog.slug || createSlug(blog.title),
  excerpt: blog.excerpt || fallbackExcerpt(blog.content),
  createdAt: blog.createdAt || new Date().toISOString(),
  updatedAt: blog.updatedAt || blog.createdAt || new Date().toISOString(),
});

export const DEFAULT_BLOGS: BlogPost[] = [
  makeBlog({
    id: 'blog-001',
    title: 'San Francisco City Hall Weddings 101',
    category: 'General',
    status: 'published',
    featureImage: ImageWaterMark,
    content:
      '<p>San Francisco City Hall weddings are a unique and romantic way to celebrate your love. The historic architecture and soft natural light make it one of the most popular ceremony spots in the city.</p><p>Start with permits, choose your ceremony time, and plan the photography route around the grand staircases and marble halls.</p>',
    createdAt: '2026-01-10T08:00:00.000Z',
    updatedAt: '2026-01-12T08:00:00.000Z',
  }),
  makeBlog({
    id: 'blog-002',
    title: 'How to Plan a Better Weekend Escape',
    category: 'Travel Tips',
    status: 'published',
    featureImage: ImageWaterMark,
    content:
      '<p>A good weekend trip starts with a tighter route, one anchor activity, and a flexible arrival window. Pick destinations where you can spend more time exploring and less time commuting.</p>',
    createdAt: '2026-01-18T08:00:00.000Z',
    updatedAt: '2026-01-18T08:00:00.000Z',
  }),
  makeBlog({
    id: 'blog-003',
    title: 'Exploring the Green Spaces of Realar Residence',
    category: 'Destinations',
    status: 'published',
    featureImage: ImageWaterMark,
    content:
      '<p>Realar Residence balances modern living with tree-lined outdoor areas, making it an ideal stop for travelers who want both comfort and calm in one place.</p>',
    createdAt: '2026-02-05T08:00:00.000Z',
    updatedAt: '2026-02-06T08:00:00.000Z',
  }),
  makeBlog({
    id: 'blog-004',
    title: 'What Makes a Tour Guide Truly Exceptional',
    category: 'Guides',
    status: 'draft',
    featureImage: ImageWaterMark,
    content:
      '<p>The best guides are part storyteller, part logistics expert, and part local ambassador. They know when to slow a group down, when to speed things up, and how to keep every stop memorable.</p>',
    createdAt: '2026-03-01T08:00:00.000Z',
    updatedAt: '2026-03-03T08:00:00.000Z',
  }),
  makeBlog({
    id: 'blog-005',
    title: 'Monthly Travel Roundup: Routes, Seasons, and Quick Wins',
    category: 'News',
    status: 'published',
    featureImage: ImageWaterMark,
    content:
      '<p>This month’s roundup covers route changes, seasonal highlights, and small fixes that make a big difference in planning. Keep the list short and actionable for readers who want to book fast.</p>',
    createdAt: '2026-03-20T08:00:00.000Z',
    updatedAt: '2026-03-20T08:00:00.000Z',
  }),
];

const isBrowser = typeof window !== 'undefined';

export const loadAdminBlogs = () => {
  if (!isBrowser) {
    return DEFAULT_BLOGS;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return DEFAULT_BLOGS;
    }

    const parsed = JSON.parse(raw) as BlogPost[];

    if (!Array.isArray(parsed)) {
      return DEFAULT_BLOGS;
    }

    return parsed.map((blog) => makeBlog(blog));
  }
  catch {
    return DEFAULT_BLOGS;
  }
};

export const saveAdminBlogs = (blogs: BlogPost[]) => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
};

export const getAdminBlogById = (blogId?: string | null) => {
  if (!blogId) {
    return null;
  }

  return loadAdminBlogs().find((blog) => blog.id === blogId) ?? null;
};

export const upsertAdminBlog = (blog: BlogPost) => {
  const blogs = loadAdminBlogs();
  const existingIndex = blogs.findIndex((item) => item.id === blog.id);
  const nextBlogs = existingIndex >= 0 ? blogs.map((item) => (item.id === blog.id ? blog : item)) : [blog, ...blogs];

  saveAdminBlogs(nextBlogs);
  return nextBlogs;
};

export const deleteAdminBlog = (blogId: string) => {
  const nextBlogs = loadAdminBlogs().filter((blog) => blog.id !== blogId);
  saveAdminBlogs(nextBlogs);
  return nextBlogs;
};

export const createBlogPayload = (blog: BlogPost) => ({
  ...blog,
  excerpt: blog.excerpt || fallbackExcerpt(blog.content),
  slug: blog.slug || createSlug(blog.title),
  updatedAt: new Date().toISOString(),
});
