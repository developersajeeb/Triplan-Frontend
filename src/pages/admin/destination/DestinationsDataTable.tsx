import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit2, Trash2 } from 'lucide-react';
import { GlobalDeleteConfirmation } from '@/components/shared/blocks/GlobalDeleteConfirmation';
import ImageWaterMark from '@/assets/images/image-watermark.webp';

export type DestinationRow = {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  totalTourListing?: number;
};

type Props = {
  data: DestinationRow[];
  isLoading?: boolean;
  onEdit: (item: DestinationRow) => void;
  onDelete: (id: string) => void;
};

const DestinationsDataTable = ({ data, isLoading = false, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[980px]">
        <TableCaption>Destination list</TableCaption>
        <TableHeader>
          <TableRow className="bg-primary-50 hover:bg-primary-50">
            <TableHead className="min-w-[80px] max-w-[80px] text-sm font-bold py-3 pl-6">No.</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Image</TableHead>
            <TableHead className="min-w-[220px] text-sm font-bold py-3">Destination Name</TableHead>
            <TableHead className="min-w-[320px] text-sm font-bold py-3">Description</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Total Tours</TableHead>
            <TableHead className="text-sm font-bold py-3 pr-6 text-right min-w-[180px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`destination-skeleton-${index}`}>
                <TableCell className="pl-6 py-3"><Skeleton className="h-5 w-8" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-14 w-14 rounded-lg" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-48" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-full max-w-[300px]" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-12" /></TableCell>
                <TableCell className="py-3 pr-6">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-16 rounded-lg" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={row._id} className="border-slate-200 hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium pl-6 text-gray-800 py-3">
                  {String(index + 1).padStart(2, '0')}
                </TableCell>
                <TableCell className="py-3">
                  <div className="h-14 w-14 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                    <img
                      src={row.thumbnail || ImageWaterMark}
                      alt={`${row.name} thumbnail`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = ImageWaterMark;
                        e.currentTarget.onerror = null;
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell className="py-3 font-medium text-slate-900">{row.name}</TableCell>
                <TableCell className="py-3 text-gray-700 truncate max-w-[320px]">{row.description || '-'}</TableCell>
                <TableCell className="py-3 text-gray-700">{row.totalTourListing ?? 0}</TableCell>
                <TableCell className="py-3 pr-6">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="bg-primary-900 hover:bg-primary-400 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300"
                      title="Edit"
                    >
                      <Edit2 size={16} /> Edit
                    </button>

                    <GlobalDeleteConfirmation onConfirm={() => onDelete(row._id)}>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300"
                        title="Delete"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </GlobalDeleteConfirmation>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-gray-500">
                No destination found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DestinationsDataTable;
