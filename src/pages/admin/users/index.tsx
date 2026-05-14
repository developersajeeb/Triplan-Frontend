import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import PaginationComponent from '@/components/ui/PaginationComponent';
import ConfirmationDialog from '@/components/utilities/ConfirmationDialog';
import {
  useDeleteAdminUserMutation,
  useGetAdminUsersQuery,
  useUpdateAdminUserMutation,
  type IAdminUserRecord,
} from '@/redux/features/user/user.api';
import TableFilter from './TableFilter';
import UsersDataTable from './UsersDataTable';
import UserDetailsSheet from './UserDetailsSheet';
import UserEditSheet from './UserEditSheet';

type AdminUsersResponse = {
  data?: IAdminUserRecord[];
  meta?: {
    page?: number;
    total?: number;
    totalPages?: number;
    totalPage?: number;
  };
};

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') || '1'));
  const search = searchParams.get('search') || '';
  const role = searchParams.get('role') || 'all';
  const status = searchParams.get('status') || 'all';
  const sort = searchParams.get('sort') || '-createdAt';

  const { data, isLoading, isFetching } = useGetAdminUsersQuery({
    page,
    limit: 10,
    ...(search ? { search } : {}),
    ...(role && role !== 'all' ? { role } : {}),
    ...(status && status !== 'all' ? { status } : {}),
    ...(sort ? { sort } : {}),
  }) as { data?: AdminUsersResponse; isLoading: boolean; isFetching: boolean };

  const [updateAdminUser, { isLoading: isUpdating }] = useUpdateAdminUserMutation();
  const [deleteAdminUser, { isLoading: isDeleting }] = useDeleteAdminUserMutation();

  const [viewingUser, setViewingUser] = useState<IAdminUserRecord | null>(null);
  const [editingUser, setEditingUser] = useState<IAdminUserRecord | null>(null);
  const [deletingUser, setDeletingUser] = useState<IAdminUserRecord | null>(null);

  const users = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data?.data]);

  const handleFiltersChange = (filters: { search: string; role: string; status: string; sort: string }) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (filters.search?.trim()) {
      params.set('search', filters.search.trim());
    } else {
      params.delete('search');
    }

    if (filters.role && filters.role !== 'all') {
      params.set('role', filters.role);
    } else {
      params.delete('role');
    }

    if (filters.status && filters.status !== 'all') {
      params.set('status', filters.status);
    } else {
      params.delete('status');
    }

    if (filters.sort && filters.sort !== '-createdAt') {
      params.set('sort', filters.sort);
    } else {
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

  const handleSaveUser = async (payload: FormData) => {
    if (!editingUser) {
      return;
    }

    const toastId = toast.loading('Updating user...');

    try {
      await updateAdminUser({ userId: editingUser._id, payload }).unwrap();
      toast.success('User updated successfully.', { id: toastId });
      setEditingUser(null);
    } catch (error: unknown) {
      const message = (error as { data?: { message?: string } })?.data?.message || 'Failed to update user.';
      toast.error(message, { id: toastId });
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) {
      return;
    }

    const toastId = toast.loading('Deleting user...');

    try {
      await deleteAdminUser(deletingUser._id).unwrap();
      toast.success('User deleted successfully.', { id: toastId });
      setDeletingUser(null);
    } catch (error: unknown) {
      const message = (error as { data?: { message?: string } })?.data?.message || 'Failed to delete user.';
      toast.error(message, { id: toastId });
    }
  };

  const totalUsers = Number(data?.meta?.total ?? 0);
  const currentPage = Number(data?.meta?.page ?? page);
  const totalPages = Math.max(1, Number(data?.meta?.totalPages ?? data?.meta?.totalPage ?? Math.ceil(totalUsers / 10)));

  return (
    <>
      <h2 className="text-2xl font-bold">Users</h2>
      <p className="text-base font-medium text-gray-600 mb-5">
        Manage customer profiles, review booking volume, and update account details.
      </p>

      <div className="border border-gray-200 rounded-xl pb-6 bg-white">
        <TableFilter
          onChange={handleFiltersChange}
          initialSearch={search}
          initialRole={role}
          initialStatus={status}
          initialSort={sort}
        />

        <UsersDataTable
          data={users}
          isLoading={isLoading || isFetching}
          onView={setViewingUser}
          onEdit={setEditingUser}
          onDelete={setDeletingUser}
        />

        {totalUsers > 10 ? (
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

      <UserDetailsSheet
        user={viewingUser}
        open={Boolean(viewingUser)}
        onOpenChange={(open) => !open && setViewingUser(null)}
      />

      <UserEditSheet
        user={editingUser}
        open={Boolean(editingUser)}
        onOpenChange={(open) => !open && setEditingUser(null)}
        onSubmit={handleSaveUser}
        isSubmitting={isUpdating}
      />

      <ConfirmationDialog
        isOpen={Boolean(deletingUser)}
        title="Delete User"
        description={`This will mark ${deletingUser?.name || 'this user'} as deleted. They will no longer appear in the active users list.`}
        confirmText="Delete"
        onConfirm={handleDeleteUser}
        onCancel={() => setDeletingUser(null)}
        isLoading={isDeleting}
        isDestructive
      />
    </>
  );
};

export default Users;