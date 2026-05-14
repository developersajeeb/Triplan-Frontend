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
import { MapPin, Users } from 'lucide-react';

type EarningRow = {
  id: string;
  customer: string;
  destination: string;
  guests: number;
  date: string;
  amount: number;
  status: string;
};

type Props = {
  data: EarningRow[];
  isLoading?: boolean;
};

const normalizeStatus = (status?: string) => (status ?? '').toLowerCase();

const formatStatusLabel = (status?: string) => {
  const normalized = normalizeStatus(status);

  if (normalized === 'paid' || normalized.includes('complete')) {
    return 'Complete';
  }

  if (normalized.includes('pending') || normalized.includes('unpaid')) {
    return 'Pending';
  }

  if (normalized.includes('cancel')) {
    return 'Cancel';
  }

  if (!status) {
    return 'N/A';
  }

  return status;
};

const getPaymentStatusClassName = (status?: string) => {
  const normalized = normalizeStatus(status);

  if (normalized === 'paid' || normalized === 'complete' || normalized === 'completed') {
    return 'bg-green-100 text-green-700';
  }

  if (normalized === 'unpaid') {
    return 'bg-yellow-100 text-yellow-700';
  }

  if (normalized === 'pending') {
    return 'bg-yellow-100 text-yellow-700';
  }

  if (normalized === 'failed' || normalized === 'fail') {
    return 'bg-red-100 text-red-700';
  }

  if (normalized === 'cancelled' || normalized === 'cancel') {
    return 'bg-orange-100 text-orange-700';
  }

  if (normalized === 'refunded') {
    return 'bg-blue-100 text-blue-700';
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

  return date.toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(amount);
};

const EarningsDataTable = ({ data, isLoading = false }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[1000px]">
        <TableCaption>Admin earnings list</TableCaption>
        <TableHeader>
          <TableRow className="bg-primary-50 hover:bg-primary-50">
            <TableHead className="min-w-[50px] max-w-[50px] text-sm font-bold py-3 pl-6">No.</TableHead>
            <TableHead className="min-w-[150px] text-sm font-bold py-3">Customer</TableHead>
            <TableHead className="min-w-[150px] text-sm font-bold py-3">Destination</TableHead>
            <TableHead className="min-w-[100px] text-sm font-bold py-3">Amount</TableHead>
            <TableHead className="min-w-[100px] text-sm font-bold py-3">Date</TableHead>
            <TableHead className="min-w-[100px] text-sm font-bold py-3">Status</TableHead>
            <TableHead className="min-w-[100px] text-sm font-bold py-3">Guests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`earning-skeleton-${index}`}>
                <TableCell className="pl-6 py-3"><Skeleton className="h-5 w-6" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-28" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-12" /></TableCell>
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map((row, index) => {
              const normalized = normalizeStatus(row.status);
              const isCompleted = normalized.includes('complete');

              return (
                <TableRow key={row.id} className="border-slate-200 hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium pl-6 text-gray-800 py-3">
                    {String(index + 1).padStart(2, '0')}
                  </TableCell>
                  <TableCell className="py-3 font-medium text-slate-900">{row.customer || 'N/A'}</TableCell>
                  <TableCell className="py-3 text-slate-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{row.destination || 'N/A'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 font-semibold text-slate-900">{formatCurrency(row.amount)}</TableCell>
                  <TableCell className="py-3 text-slate-600">{formatDate(row.date)}</TableCell>
                  <TableCell className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${isCompleted
                        ? 'bg-green-50 text-green-700'
                        : normalized.includes('pending')
                          ? 'bg-yellow-50 text-yellow-700'
                          : getPaymentStatusClassName(row.status)
                        }`}
                    >
                        {formatStatusLabel(row.status)}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-1 text-slate-900">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium">{row.guests}</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center text-gray-500">
                No earnings data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EarningsDataTable;
