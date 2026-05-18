/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams, Link } from 'react-router';
import { toast } from 'sonner';
import TableFilter from './TableFilter';
import BlogsDataTable from './BlogsDataTable';
import PaginationComponent from '@/components/ui/PaginationComponent';
import { Button } from '@/components/ui/button';
import { useDeleteBlogMutation, useGetBlogsQuery, useGetCategoriesQuery } from '@/redux/features/blog/blog.api';
import type { IBlogListItem } from '@/types';

const PAGE_SIZE = 6;

const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteBlog] = useDeleteBlogMutation();
  const { data: categoriesResponse } = useGetCategoriesQuery();
  const filterCategories = categoriesResponse?.data ?? [];

  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const status = searchParams.get('status') || 'all';
  const sort = searchParams.get('sort') || 'newest';

  const { data, isLoading, isFetching } = useGetBlogsQuery({
    page,
    limit: PAGE_SIZE,
    search: search.trim() || undefined,
    category: category !== 'all' ? category : undefined,
    status,
    sort,
  });

  const pageBlogs = (data?.data ?? []) as IBlogListItem[];
  const totalPages = Number(data?.meta?.totalPages ?? 1);
  const currentPage = Number(data?.meta?.page ?? page);
  const totalBlogs = Number(data?.meta?.total ?? 0);

  const handleFiltersChange = (filters: { search: string; category: string; status: string; sort: string }) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (filters.search.trim()) {
      params.set('search', filters.search.trim());
    }
    else {
      params.delete('search');
    }

    if (filters.category && filters.category !== 'all') {
      params.set('category', filters.category);
    }
    else {
      params.delete('category');
    }

    if (filters.status && filters.status !== 'all') {
      params.set('status', filters.status);
    }
    else {
      params.delete('status');
    }

    if (filters.sort && filters.sort !== 'newest') {
      params.set('sort', filters.sort);
    }
    else {
      params.delete('sort');
    }

    setSearchParams(params);
  };

  const handlePageChange = (pageNum: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageNum));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (blog: IBlogListItem) => {
    deleteBlog(blog._id)
      .unwrap()
      .then(() => toast.success(`Blog "${blog.title}" deleted successfully.`))
      .catch((error: any) => {
        toast.error(error?.data?.message || 'Failed to delete blog.');
      });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Blogs</h2>
          <p className="text-base font-medium text-gray-600 mb-5">Manage all blog posts here.</p>
        </div>

        <Button asChild className="bg-primary-900 hover:bg-primary-700 text-white rounded-xl px-5 py-2.5 h-auto">
          <Link to="/admin/add-blog">Add New Blog</Link>
        </Button>
      </div>

      <div className="border border-gray-200 rounded-xl pb-6 bg-white">
        <TableFilter
          onChange={handleFiltersChange}
          categories={filterCategories}
          initialSearch={search}
          initialCategory={category}
          initialStatus={status}
          initialSort={sort}
        />

        <BlogsDataTable data={pageBlogs} isLoading={isLoading || isFetching} onDelete={handleDelete} />

        {totalBlogs > PAGE_SIZE ? (
          <div className="mt-8 flex justify-center">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              paginationItemsToDisplay={2}
              onPageChange={handlePageChange}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Blogs;
