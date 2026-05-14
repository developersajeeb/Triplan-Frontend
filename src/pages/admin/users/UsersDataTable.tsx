import { FaRegTrashAlt } from 'react-icons/fa';
import { PencilLine, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/config';
import type { IAdminUserRecord } from '@/redux/features/user/user.api';

type Props = {
  data: IAdminUserRecord[];
  isLoading?: boolean;
  onView: (user: IAdminUserRecord) => void;
  onEdit: (user: IAdminUserRecord) => void;
  onDelete: (user: IAdminUserRecord) => void;
};

const formatDate = (value?: string) => {
  if (!value) {
    return 'N/A';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const getStatusClassName = (status?: string) => {
  const normalized = (status ?? '').toLowerCase();

  if (normalized === 'active') {
    return 'bg-green-100 text-green-700';
  }

  if (normalized === 'blocked') {
    return 'bg-red-100 text-red-700';
  }

  if (normalized === 'inactive') {
    return 'bg-yellow-100 text-yellow-700';
  }

  return 'bg-slate-100 text-slate-700';
};

const getRoleClassName = (role?: string) => {
  const normalized = (role ?? '').toLowerCase();

  if (normalized.includes('super')) {
    return 'bg-violet-100 text-violet-700';
  }

  if (normalized === 'admin') {
    return 'bg-blue-100 text-blue-700';
  }

  if (normalized === 'guide') {
    return 'bg-cyan-100 text-cyan-700';
  }

  return 'bg-slate-100 text-slate-700';
};

const UsersDataTable = ({ data, isLoading = false, onView, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full min-w-[1400px]">
        <TableCaption>Admin users list</TableCaption>
        <TableHeader>
          <TableRow className="bg-primary-50 hover:bg-primary-50">
            <TableHead className="min-w-[60px] max-w-[60px] text-sm font-bold py-3 pl-6">No.</TableHead>
            <TableHead className="min-w-[180px] text-sm font-bold py-3">User</TableHead>
            <TableHead className="min-w-[240px] text-sm font-bold py-3">Email</TableHead>
            <TableHead className="min-w-[160px] text-sm font-bold py-3">Phone</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Tours Booked</TableHead>
            <TableHead className="min-w-[140px] text-sm font-bold py-3">Spent</TableHead>
            <TableHead className="min-w-[140px] text-sm font-bold py-3">Registered</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Role</TableHead>
            <TableHead className="min-w-[120px] text-sm font-bold py-3">Status</TableHead>
            <TableHead className="text-sm font-bold py-3 pr-6 text-right min-w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`user-skeleton-${index}`}>
                <TableCell className="pl-6 py-3"><Skeleton className="h-5 w-8" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-36" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-48" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-28" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-16" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-28" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                <TableCell className="py-3 pr-6">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-16 rounded-lg" />
                    <Skeleton className="h-8 w-14 rounded-lg" />
                    <Skeleton className="h-8 w-16 rounded-lg" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : data.length > 0 ? (
            data.map((user, index) => (
              <TableRow key={user._id} className="border-slate-200 hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium pl-6 text-gray-800 py-3">{String(index + 1).padStart(2, '0')}</TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-primary-100 overflow-hidden flex items-center justify-center text-primary-700 font-semibold shrink-0">
                      {user.picture ? (
                        <img src={user.picture} alt={user.name} className="h-full w-full object-cover" />
                      ) : (
                        <span>{user.name?.slice(0, 2).toUpperCase() || 'U'}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 leading-5">{user.name || 'N/A'}</p>
                      <p className="text-xs text-slate-500">ID: {user._id.slice(-8)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-slate-700 break-all">{user.email || 'N/A'}</TableCell>
                <TableCell className="py-3 text-slate-700">{user.phone || 'N/A'}</TableCell>
                <TableCell className="py-3 font-semibold text-slate-900">{Number(user.toursBookedCount ?? user.bookingsCount ?? 0)}</TableCell>
                <TableCell className="py-3 font-semibold text-slate-900">{formatCurrency(Number(user.totalSpent ?? 0))}</TableCell>
                <TableCell className="py-3 text-slate-700">{formatDate(user.createdAt)}</TableCell>
                <TableCell className="py-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getRoleClassName(user.role)}`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusClassName(user.isActive)}`}>
                    {user.isActive || 'Unknown'}
                  </span>
                </TableCell>
                <TableCell className="py-3 pr-6">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onView(user)}
                      className="bg-primary-900 hover:bg-primary-400 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300"
                    >
                      View <Eye size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300"
                    >
                      Edit <PencilLine size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(user)}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300"
                    >
                      Delete <FaRegTrashAlt />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="py-10 text-center text-gray-500">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersDataTable;