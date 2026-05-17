import WhiteSvgIcon from "@/components/shared/blocks/WhiteSvgIcon";
import { Link } from "react-router";
import BlogCard from "@/components/shared/blocks/BlogCard";
import { useGetBlogsQuery } from "@/redux/features/blog/blog.api";
import BlogCardSkeleton from "@/components/shared/blocks/BlogCardSkeleton";

const NewsArticles = () => {
    const { data, isLoading } = useGetBlogsQuery({ limit: 3, sort: '-createdAt', status: 'published' });
    const blogs = data?.data ?? [];

    return (
        <section className="tp-container py-12 md:py-16 lg:py-20">
            <div className='flex flex-col sm:flex-row sm:items-end gap-2'>
                <div className='flex-1 mb-3 sm:mb-0'>
                    <h4 className="section-sub-title text-primary-950">
                        News & Articles
                    </h4>
                    <h2 className="section-title text-primary-950">
                        Stories, news & insights
                    </h2>
                </div>

                <div>
                    <Link className="tp-primary-btn inline-flex items-center gap-3" to="/blog">
                        More Articles
                        <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-10">
                {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={i} />)
                    : blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            title={blog.title}
                            slug={blog.slug}
                            category={blog.category}
                            createdAt={blog.createdAt}
                            featureImage={blog.featureImage}
                            excerpt={blog.excerpt}
                        />
                    ))
                }
            </div>
        </section>
    );
};

export default NewsArticles;