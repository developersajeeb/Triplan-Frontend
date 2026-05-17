import React from 'react';
import { Link } from 'react-router';
import { useGetBlogsQuery, useGetCategoriesQuery } from '@/redux/features/blog/blog.api';
import { Skeleton } from '@/components/ui/skeleton';
import { formatBlogDate } from '@/pages/admin/blogs/blog-data';
import { BookOpen, Folder, Mail, Newspaper } from 'lucide-react';

export type TocItem = { id: string; text: string; level: 2 | 3 };

// ── Table of Contents ────────────────────────────────────────────────────────

function TableOfContents({ headings, activeId }: { headings: TocItem[]; activeId: string }) {
    if (headings.length === 0) return null;
    return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
            <h3 className="flex items-center gap-2 text-xs font-bold text-primary-900 uppercase tracking-widest mb-4">
                <BookOpen className="w-4 h-4" />
                Table of Contents
            </h3>
            <nav className="space-y-0.5">
                {headings.map((h) => (
                    <a
                        key={h.id}
                        href={`#${h.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`block text-sm leading-snug py-1.5 pl-3 border-l-2 transition-all duration-150 ${h.level === 3 ? 'ml-4 text-xs' : ''
                            } ${activeId === h.id
                                ? 'border-primary-400 text-primary-600 font-semibold'
                                : 'border-transparent text-slate-500 hover:text-primary-500 hover:border-primary-200'
                            }`}
                    >
                        {h.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}

// ── Related Posts ─────────────────────────────────────────────────────────────

function RelatedPosts({ category, currentSlug }: { category: string; currentSlug: string }) {
    const { data, isLoading } = useGetBlogsQuery(
        { category, status: 'published', limit: 4 },
        { skip: !category }
    );
    const posts = (data?.data ?? []).filter((p) => p.slug !== currentSlug).slice(0, 3);

    return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
            <h3 className="flex items-center gap-2 text-xs font-bold text-primary-900 uppercase tracking-widest mb-4">
                <Newspaper className="w-4 h-4" />
                Related Posts
            </h3>
            {isLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex gap-3">
                            <Skeleton className="w-16 h-16 rounded-xl shrink-0" />
                            <div className="flex-1 space-y-2 pt-1">
                                <Skeleton className="h-3.5 w-full" />
                                <Skeleton className="h-3.5 w-4/5" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <p className="text-sm text-slate-400">No related posts found.</p>
            ) : (
                <div className="divide-y divide-slate-50">
                    {posts.map((post) => (
                        <Link key={post._id} to={`/blog/${post.slug}`} className="flex gap-3 group py-3 first:pt-0 last:pb-0">
                            <img
                                src={post.featureImage}
                                alt={post.title}
                                className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:opacity-90 transition-opacity"
                            />
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-700 line-clamp-2 group-hover:text-primary-500 transition-colors leading-snug">
                                    {post.title}
                                </p>
                                <p className="text-xs text-slate-400 mt-1.5">{formatBlogDate(post.createdAt)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Categories ────────────────────────────────────────────────────────────────

function Categories() {
    const { data, isLoading } = useGetCategoriesQuery();
    const categories = data?.data ?? [];

    return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-5">
            <h3 className="flex items-center gap-2 text-xs font-bold text-primary-900 uppercase tracking-widest mb-4">
                <Folder className="w-4 h-4" />
                Categories
            </h3>
            {isLoading ? (
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-7 w-20 rounded-full" />
                    ))}
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            to={`/blog?category=${encodeURIComponent(cat)}`}
                            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-primary-500 hover:text-white transition-colors duration-200"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Newsletter ────────────────────────────────────────────────────────────────

function Newsletter() {
    const [email, setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubmitted(true);
    };

    return (
        <div className="rounded-2xl bg-gradient-to-br from-primary-800 to-primary-950 p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 opacity-80" />
                <h3 className="text-xs font-bold uppercase tracking-widest">Newsletter</h3>
            </div>
            <p className="text-white/65 text-sm mb-4 leading-relaxed mt-1">
                Get the latest travel guides and stories delivered to your inbox.
            </p>
            {submitted ? (
                <div className="bg-white/10 rounded-xl px-4 py-3 text-sm text-white/90 font-medium text-center">
                    Thanks for subscribing! ✓
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                    />
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-white text-primary-900 font-semibold text-sm py-2.5 hover:bg-primary-50 transition-colors duration-200 cursor-pointer"
                    >
                        Subscribe
                    </button>
                </form>
            )}
        </div>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────

type BlogSidebarProps = {
    headings: TocItem[];
    activeId: string;
    category: string;
    currentSlug: string;
};

const BlogSidebar = ({ headings, activeId, category, currentSlug }: BlogSidebarProps) => (
    <aside className="space-y-5">
        <TableOfContents headings={headings} activeId={activeId} />
        <RelatedPosts category={category} currentSlug={currentSlug} />
        <Categories />
        <Newsletter />
    </aside>
);

export default BlogSidebar;
