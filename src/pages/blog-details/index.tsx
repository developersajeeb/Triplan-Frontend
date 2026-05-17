import React from 'react';
import { Link, useParams } from 'react-router';
import { useGetBlogBySlugQuery } from '@/redux/features/blog/blog.api';
import { Skeleton } from '@/components/ui/skeleton';
import { formatBlogDate } from '@/pages/admin/blogs/blog-data';
import '@/components/shared/blog-editor/blog-editor.css';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import BlogSidebar, { type TocItem } from './BlogSidebar';

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function parseHeadings(html: string): TocItem[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const items: TocItem[] = [];
    doc.querySelectorAll('h2, h3').forEach((el, i) => {
        const level = el.tagName === 'H2' ? 2 : 3;
        const text = el.textContent?.trim() ?? '';
        const id = slugify(text) || `heading-${i}`;
        items.push({ id, text, level } as TocItem);
    });
    return items;
}

const BlogDetails = () => {
    const { id: slug = '' } = useParams();
    const { data, isLoading, isFetching } = useGetBlogBySlugQuery(slug, { skip: !slug });
    const blog = data?.data;
    const loading = isLoading || isFetching;

    const articleRef = React.useRef<HTMLElement>(null);
    const [headings, setHeadings] = React.useState<TocItem[]>([]);
    const [activeId, setActiveId] = React.useState('');

    React.useEffect(() => {
        if (!blog?.content) return;
        setHeadings(parseHeadings(blog.content));
    }, [blog?.content]);

    React.useEffect(() => {
        if (!articleRef.current || headings.length === 0) return;

        const domHeadings = articleRef.current.querySelectorAll('h2, h3');
        domHeadings.forEach((el, i) => {
            if (headings[i]) el.id = headings[i].id;
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
        );

        domHeadings.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [headings]);

    return (
        <div className="min-h-screen bg-white">

            {/* Hero image with gradient overlay */}
            <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden bg-slate-200">
                {loading ? (
                    <Skeleton className="w-full h-full rounded-none" />
                ) : blog ? (
                    <img src={blog.featureImage} alt={blog.title} className="w-full h-full object-cover" />
                ) : null}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                {/* Back button */}
                <div className="absolute top-6 left-0 right-0">
                    <div className="tp-container">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                    </div>
                </div>

                {/* Title block */}
                {!loading && blog && (
                    <div className="absolute bottom-0 left-0 right-0 pb-10 pt-6">
                        <div className="tp-container">
                            <span className="inline-flex items-center gap-1.5 bg-primary-400 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                                <Tag className="w-3 h-3" />
                                {blog.category}
                            </span>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
                                {blog.title}
                            </h1>
                            <div className="flex items-center gap-2 mt-3 text-white/75 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>{formatBlogDate(blog.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content + Sidebar */}
            <div className="tp-container py-12">
                {loading ? (
                    <div className="grid lg:grid-cols-[1fr_300px] gap-10">
                        <div className="space-y-3">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <Skeleton key={i} className={`h-5 rounded-lg ${i % 3 === 2 ? 'w-4/5' : 'w-full'}`} />
                            ))}
                            <Skeleton className="mt-4 h-32 w-full rounded-xl" />
                        </div>
                        <div className="space-y-5">
                            <Skeleton className="h-44 w-full rounded-2xl" />
                            <Skeleton className="h-56 w-full rounded-2xl" />
                            <Skeleton className="h-32 w-full rounded-2xl" />
                            <Skeleton className="h-36 w-full rounded-2xl" />
                        </div>
                    </div>
                ) : blog ? (
                    <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">
                        <article
                            ref={articleRef}
                            className="blog-editor-content text-[15px] leading-relaxed min-w-0"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                        <div className="lg:sticky lg:top-24 min-w-0">
                            <BlogSidebar
                                headings={headings}
                                activeId={activeId}
                                category={blog.category}
                                currentSlug={slug}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-lg text-gray-500 mb-4">Blog post not found.</p>
                        <Link to="/blog" className="text-primary-500 hover:text-primary-700 font-medium hover:underline">
                            ← Return to blog
                        </Link>
                    </div>
                )}
            </div>

        </div>
    );
};

export default BlogDetails;
