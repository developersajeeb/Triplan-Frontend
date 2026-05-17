import { Link } from 'react-router';
import { formatDistanceToNowStrict } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { formatBlogDate } from './blog-data';
import type { IBlogListItem } from '@/types';

type Props = {
  data: IBlogListItem[];
  isLoading?: boolean;
  onDelete: (blog: IBlogListItem) => void;
};

const getStatusClassName = (status: string) => {
  if (status === 'published') {
    return 'bg-green-100 text-green-700';
  }

  return 'bg-amber-100 text-amber-700';
};

const BlogsDataTable = ({ data, isLoading = false, onDelete }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[1120px]">
        <TableCaption>Admin blogs list</TableCaption>
        <TableHeader>
          <TableRow className="bg-primary-50 hover:bg-primary-50">
            <TableHead className="min-w-[60px] max-w-[60px] text-sm font-bold py-3 pl-6">No.</TableHead>
            <TableHead className="min-w-[340px] text-sm font-bold py-3">Title</TableHead>
            <TableHead className="min-w-[160px] text-sm font-bold py-3">Category</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Status</TableHead>
            <TableHead className="min-w-[160px] text-sm font-bold py-3">Published</TableHead>
            <TableHead className="min-w-[160px] text-sm font-bold py-3">Updated</TableHead>
            <TableHead className="text-sm font-bold py-3 pr-6 text-right min-w-[220px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`blog-skeleton-${index}`}>
                <TableCell className="pl-6 py-3"><Skeleton className="h-5 w-8" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-80" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-28" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-28" /></TableCell>
                <TableCell className="py-3 pr-6">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-14 rounded-lg" />
                    <Skeleton className="h-8 w-14 rounded-lg" />
                    <Skeleton className="h-8 w-16 rounded-lg" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map((blog, index) => (
              <TableRow key={blog._id} className="border-slate-200 hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium pl-6 text-gray-800 py-4">{String(index + 1).padStart(2, '0')}</TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <img src={blog.featureImage} alt={blog.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <Link to={`/blog/${blog.slug}`} className="block max-w-[260px] truncate font-semibold text-slate-900 hover:text-primary-500 duration-300" title={blog.title}>
                        {blog.title}
                      </Link>
                      <p className="mt-1 max-w-[360px] truncate text-sm text-slate-500" title={blog.excerpt}>
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-slate-700">{blog.category}</TableCell>
                <TableCell className="py-4">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClassName(blog.status)}`}>
                    {blog.status}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-slate-700">{formatBlogDate(blog.createdAt)}</TableCell>
                <TableCell className="py-4 text-slate-700">{formatDistanceToNowStrict(new Date(blog.updatedAt), { addSuffix: true })}</TableCell>
                <TableCell className="py-4 pr-6">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <Link to={`/blog/${blog.slug}`} className="bg-primary-900 hover:bg-primary-400 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300">
                      View
                    </Link>
                    <Link to={`/admin/edit-blog/${blog.slug}`} className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300">
                      Edit
                    </Link>
                    <Button type="button" variant="destructive" className="h-8 rounded-lg px-3 text-sm font-medium" onClick={() => onDelete(blog)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center text-gray-500">
                No blogs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogsDataTable;
