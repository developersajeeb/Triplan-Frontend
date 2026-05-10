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

export type TourTypeRow = {
  _id: string;
  name: string;
};

type Props = {
  data: TourTypeRow[];
  isLoading?: boolean;
  onEdit: (item: TourTypeRow) => void;
  onDelete: (id: string) => void;
};

const TourTypesDataTable = ({ data, isLoading = false, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[700px]">
        <TableCaption>Tour type list</TableCaption>
        <TableHeader>
          <TableRow className="bg-primary-50 hover:bg-primary-50">
            <TableHead className="min-w-[80px] max-w-[80px] text-sm font-bold py-3 pl-6">No.</TableHead>
            <TableHead className="min-w-[240px] text-sm font-bold py-3">Tour Type Name</TableHead>
            <TableHead className="text-sm font-bold py-3 pr-6 text-right min-w-[180px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`tour-type-skeleton-${index}`}>
                <TableCell className="pl-6 py-3"><Skeleton className="h-5 w-8" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-56" /></TableCell>
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
                <TableCell className="py-3 font-medium text-slate-900">{row.name}</TableCell>
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
              <TableCell colSpan={3} className="py-10 text-center text-gray-500">
                No tour type found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TourTypesDataTable;
