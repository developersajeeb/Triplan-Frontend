import PageBanner from "@/components/shared/sections/PageBanner";
import BlogCard from "@/components/shared/blocks/BlogCard";
import { useGetBlogsQuery, useGetCategoriesQuery } from "@/redux/features/blog/blog.api";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router";
import BlogFilter from "./BlogFilter";

const BlogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'all';
    const sort = searchParams.get('sort') || 'newest';

    const { data: categoriesData } = useGetCategoriesQuery();
    const categories = categoriesData?.data ?? [];

    const { data, isLoading, isFetching } = useGetBlogsQuery({
        page: 1,
        limit: 12,
        search: search || undefined,
        category: category !== 'all' ? category : undefined,
        status: 'published',
        sort,
    });

    const handleFilterChange = (filters: { search: string; category: string; sort: string }) => {
        const params = new URLSearchParams();
        if (filters.search.trim()) params.set('search', filters.search.trim());
        if (filters.category && filters.category !== 'all') params.set('category', filters.category);
        if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort);
        setSearchParams(params);
    };

    const loading = isLoading || isFetching;

    return (
        <>
            <PageBanner title="Blog" />

            <div className="tp-container pt-8 pb-14">
                <BlogFilter
                    search={search}
                    category={category}
                    sort={sort}
                    categories={categories}
                    onChange={handleFilterChange}
                />

                <div className="grid md:grid-cols-3 gap-7 mt-14">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="h-[250px] w-full rounded-2xl" />
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-8 w-11/12" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        ))
                        : (data?.data ?? []).length === 0
                            ? (
                                <div className="col-span-3 py-16 text-center text-gray-400">
                                    <p className="text-lg font-medium">No blogs found</p>
                                    <p className="text-sm mt-1">Try adjusting your search or filters</p>
                                </div>
                            )
                            : (data?.data ?? []).map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    title={blog.title}
                                    slug={blog.slug}
                                    category={blog.category}
                                    createdAt={blog.createdAt}
                                    featureImage={blog.featureImage}
                                    excerpt={blog.excerpt}
                                />
                            ))}
                </div>
            </div>
        </>
    );
};

export default BlogPage;
