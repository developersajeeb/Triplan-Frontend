import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableCaption,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { formatCurrency } from "@/config";
import { Switch } from '@/components/ui/switch';
import { BiSolidHot } from 'react-icons/bi';
import { LuLock } from 'react-icons/lu';

export type Tour = {
  id: string;
  title: string;
  slug: string;
  location: string;
  price: number;
  isDraft: boolean;
  totalBookings?: number;
  isTrending?: boolean;
  isDisabled?: boolean;
};

interface Props {
  data: Tour[];
  onStatusChange: (tour: Tour, nextStatus: 'active' | 'draft') => void;
  onTrendingChange: (tour: Tour, nextTrending: boolean) => void;
}

const TourDataTable: React.FC<Props> = ({ data, onStatusChange, onTrendingChange }) => {

  return (
    <Table className="table-fixed min-w-[700px]">
      <TableCaption>Tour listing</TableCaption>
      <TableHeader>
        <TableRow className="bg-primary-50 hover:bg-primary-50">
          <TableHead className="text-sm font-bold py-3 pl-6">No.</TableHead>
          <TableHead className="text-sm font-bold py-3">Title</TableHead>
          <TableHead className="text-sm font-bold py-3">Location</TableHead>
          <TableHead className="text-sm font-bold py-3">Price</TableHead>
          <TableHead className="text-sm font-bold py-3">Bookings</TableHead>
          <TableHead className="text-sm font-bold py-3">Status</TableHead>
          <TableHead className="text-sm font-bold py-3">Trending</TableHead>
          <TableHead className="text-sm font-bold py-3 pr-6 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="py-10 text-center text-gray-500">
              No tours found.
            </TableCell>
          </TableRow>
        ) : (
          data.map((t, index) => (
            <TableRow key={t.id}>
              <TableCell className="font-medium pl-6 text-gray-800 py-3">{String(index + 1).padStart(2, '0')}</TableCell>
              <TableCell className="py-3 font-medium text-gray-800">{t.title}</TableCell>
              <TableCell className="py-3 text-gray-700">{t.location}</TableCell>
              <TableCell className="py-3 font-medium text-gray-800">{formatCurrency(t.price)}</TableCell>
              <TableCell className="py-3 text-sm">
                {t.totalBookings ?? 0}
              </TableCell>

              <TableCell className="py-3">
                <div className={`flex items-center gap-2 text-sm font-medium ${t.isDisabled ? 'opacity-60' : ''}`}>
                  <Switch
                    checked={!t.isDraft}
                    onCheckedChange={(checked) => onStatusChange(t, checked ? 'active' : 'draft')}
                    disabled={t.isDisabled}
                    className={t.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                    title={t.isDisabled ? 'Tour has active or upcoming batches - mark as draft after all batches complete' : ''}
                  />
                  {t.isDisabled && <LuLock size={16} className="text-yellow-600" />}
                </div>
              </TableCell>

              <TableCell className="py-3">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={Boolean(t.isTrending)}
                    onCheckedChange={(checked) => onTrendingChange(t, Boolean(checked))}
                  />
                </div>
              </TableCell>
              <TableCell className="py-3 pr-6">
                <div className="flex justify-end gap-2">
                  <Link to={`/tours/${t.slug}`} className="bg-primary-900 hover:bg-primary-400 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium duration-300">
                    View
                  </Link>
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TourDataTable;
