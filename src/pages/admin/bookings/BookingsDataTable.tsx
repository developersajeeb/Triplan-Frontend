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
import { Link } from 'react-router';
import { FaRegFilePdf } from 'react-icons/fa6';
import { formatCurrency } from '@/config';

type BookingRow = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  title: string;
  detailsUrl: string;
  guests: string;
  date: string;
  amount: number;
  status: string;
  paymentStatus: string;
  invoiceUrl?: string;
};

type Props = {
  data: BookingRow[];
  isLoading?: boolean;
};

const normalizeStatus = (status?: string) => (status ?? '').toLowerCase();

const getStatusClassName = (status?: string) => {
  const normalized = normalizeStatus(status);

  if (normalized.includes('complete') || normalized.includes('done')) {
    return 'bg-green-100 text-green-700';
  }

  if (normalized.includes('ongoing')) {
    return 'bg-blue-100 text-blue-700';
  }

  if (normalized.includes('pending') || normalized.includes('upcoming')) {
    return 'bg-yellow-100 text-yellow-700';
  }

  if (normalized.includes('cancel')) {
    return 'bg-red-100 text-red-700';
  }

  return 'bg-slate-100 text-slate-700';
};

const getPaymentStatusClassName = (status?: string) => {
  const normalized = normalizeStatus(status);

  if (normalized === 'unpaid' || normalized === 'pending') {
    return 'bg-yellow-100 text-yellow-700';
  }

  if (normalized === 'paid') {
    return 'bg-green-100 text-green-700';
  }

  if (normalized === 'failed' || normalized === 'fail' || normalized === 'cancel' || normalized === 'cancelled') {
    return 'bg-red-100 text-red-700';
  }

  return 'bg-slate-100 text-slate-700';
};

const formatDate = (value?: string) => {
  if (!value) {
    return 'N/A';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const BookingsDataTable = ({ data, isLoading = false }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[1240px]">
        <TableCaption>Admin bookings list</TableCaption>
        <TableHeader>
          <TableRow className="bg-primary-50 hover:bg-primary-50">
            <TableHead className="min-w-[60px] max-w-[60px] text-sm font-bold py-3 pl-6">No.</TableHead>
            <TableHead className="min-w-[160px] text-sm font-bold py-3">Customer</TableHead>
            <TableHead className="min-w-[220px] text-sm font-bold py-3">Email</TableHead>
            <TableHead className="min-w-[140px] text-sm font-bold py-3">Phone</TableHead>
            <TableHead className="min-w-[220px] text-sm font-bold py-3">Tour</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Guests</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Date</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Amount</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Status</TableHead>
            <TableHead className="min-w-[100px] text-sm font-bold py-3">Payment</TableHead>
            <TableHead className="text-sm font-bold py-3 pr-6 text-right min-w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`booking-skeleton-${index}`}>
                <TableCell className="pl-6 py-3"><Skeleton className="h-5 w-8" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-28" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-40" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-28" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-48" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                <TableCell className="py-3 pr-6">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-14 rounded-lg" />
                    <Skeleton className="h-8 w-14 rounded-lg" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={row.id} className="border-slate-200 hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium pl-6 text-gray-800 py-3">
                  {String(index + 1).padStart(2, '0')}
                </TableCell>
                <TableCell className="py-3 font-medium text-slate-900">{row.customer || 'N/A'}</TableCell>
                <TableCell className="py-3 text-slate-700">{row.email || 'N/A'}</TableCell>
                <TableCell className="py-3 text-slate-700">{row.phone || 'N/A'}</TableCell>
                <TableCell className="py-3 text-slate-800">
                  <Link
                    to={row.detailsUrl}
                    className="hover:text-primary-500 duration-300 line-clamp-1"
                    title={row.title || 'Tour details'}
                  >
                    {row.title || 'Tour details'}
                  </Link>
                </TableCell>
                <TableCell className="py-3 text-slate-700">{row.guests}</TableCell>
                <TableCell className="py-3 text-slate-700">{formatDate(row.date)}</TableCell>
                <TableCell className="py-3 font-semibold text-slate-900">{formatCurrency(row.amount)}</TableCell>
                <TableCell className="py-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusClassName(row.status)}`}>
                    {row.status || 'Unknown'}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getPaymentStatusClassName(row.paymentStatus)}`}>
                    {row.paymentStatus || 'Unknown'}
                  </span>
                </TableCell>
                <TableCell className="py-3 pr-6">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <Link
                      to={row.detailsUrl}
                      className="bg-primary-900 hover:bg-primary-400 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300"
                    >
                      View
                    </Link>
                    {row.invoiceUrl ? (
                      <a
                        href={row.invoiceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300"
                      >
                        PDF <FaRegFilePdf />
                      </a>
                    ) : (
                      <span className="bg-red-200 text-red-700 px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center cursor-not-allowed">
                        PDF <FaRegFilePdf />
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} className="py-10 text-center text-gray-500">
                No booking found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsDataTable;
