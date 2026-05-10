import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { IAdminReview } from '@/types';

type Props = {
  data: IAdminReview[];
  isLoading?: boolean;
  onView: (review: IAdminReview) => void;
  onEdit: (review: IAdminReview) => void;
  onDelete: (review: IAdminReview) => void;
};

const ReviewsDataTable = ({ data, isLoading = false, onView, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[1320px]">
        <TableCaption>Admin reviews list</TableCaption>
        <TableHeader>
          <TableRow className="bg-primary-50 hover:bg-primary-50">
            <TableHead className="min-w-[60px] max-w-[60px] text-sm font-bold py-3 pl-6">No.</TableHead>
            <TableHead className="min-w-[160px] text-sm font-bold py-3">User Name</TableHead>
            <TableHead className="min-w-[220px] text-sm font-bold py-3">User Email</TableHead>
            <TableHead className="min-w-[170px] text-sm font-bold py-3">Review Images</TableHead>
            <TableHead className="min-w-[90px] text-sm font-bold py-3">Guide</TableHead>
            <TableHead className="min-w-[90px] text-sm font-bold py-3">Services</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Transportation</TableHead>
            <TableHead className="min-w-[110px] text-sm font-bold py-3">Organization</TableHead>
            <TableHead className="min-w-[280px] text-sm font-bold py-3">Description</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Posted On</TableHead>
            <TableHead className="min-w-[220px] text-sm font-bold py-3 text-right pr-6">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`review-skeleton-${index}`}>
                <TableCell className="pl-6 py-3"><Skeleton className="h-5 w-8" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-44" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-12 w-24" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-12" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-14" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-18" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-56" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="py-3 pr-6">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-14 rounded-lg" />
                    <Skeleton className="h-8 w-14 rounded-lg" />
                    <Skeleton className="h-8 w-14 rounded-lg" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map((review, index) => (
              <TableRow key={review._id} className="border-slate-200 hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium pl-6 text-gray-800 py-3">
                  {String(index + 1).padStart(2, '0')}
                </TableCell>
                <TableCell className="py-3 font-medium text-slate-900">{review.userName || 'N/A'}</TableCell>
                <TableCell className="py-3 text-slate-700 break-all">{review.userEmail || 'N/A'}</TableCell>
                <TableCell className="py-3">
                  {review.images.length > 0 ? (
                    <div className="flex items-center gap-2">
                      {review.images.slice(0, 3).map((imageUrl) => (
                        <div key={imageUrl} className="h-10 w-10 overflow-hidden rounded-md border border-slate-200">
                          <img src={imageUrl} alt="Review" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </TableCell>
                <TableCell className="py-3 text-slate-700 font-medium">{review.guideRating.toFixed(1)}</TableCell>
                <TableCell className="py-3 text-slate-700 font-medium">{review.serviceRating.toFixed(1)}</TableCell>
                <TableCell className="py-3 text-slate-700 font-medium">{review.transportationRating.toFixed(1)}</TableCell>
                <TableCell className="py-3 text-slate-700 font-medium">{review.organizationRating.toFixed(1)}</TableCell>
                <TableCell className="py-3 text-slate-700 max-w-[280px]">
                  <p className="line-clamp-1" title={review.comment}>{review.comment}</p>
                </TableCell>
                <TableCell className="py-3 text-slate-700">{format(new Date(review.createdAt), 'dd MMM yyyy')}</TableCell>
                <TableCell className="py-3 pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button onClick={() => onView(review)} size="sm" className="bg-primary-900 hover:bg-primary-400 text-white">View</Button>
                    <Button onClick={() => onEdit(review)} size="sm" variant="outline">Edit</Button>
                    <Button onClick={() => onDelete(review)} size="sm" variant="destructive">Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="py-10 text-center text-gray-500">
                No reviews found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewsDataTable;
