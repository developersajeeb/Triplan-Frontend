import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RiSearch2Line } from 'react-icons/ri';
import { GrPowerReset } from 'react-icons/gr';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export type UserFilters = {
  search: string;
  role: string;
  status: string;
  sort: string;
};

interface Props {
  onChange: (filters: UserFilters) => void;
  initialSearch?: string;
  initialRole?: string;
  initialStatus?: string;
  initialSort?: string;
}

const TableFilter: React.FC<Props> = ({
  onChange,
  initialSearch = '',
  initialRole = 'all',
  initialStatus = 'all',
  initialSort = '-createdAt',
}) => {
  const [query, setQuery] = useState(initialSearch);
  const [role, setRole] = useState(initialRole || 'all');
  const [status, setStatus] = useState(initialStatus || 'all');
  const [sort, setSort] = useState(initialSort || '-createdAt');

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setRole(initialRole || 'all');
  }, [initialRole]);

  useEffect(() => {
    setStatus(initialStatus || 'all');
  }, [initialStatus]);

  useEffect(() => {
    setSort(initialSort || '-createdAt');
  }, [initialSort]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onChange({ search: query, role: role || 'all', status: status || 'all', sort: sort || '-createdAt' });
  };

  const handleReset = () => {
    setQuery('');
    setRole('all');
    setStatus('all');
    setSort('-createdAt');
    onChange({ search: '', role: 'all', status: 'all', sort: '-createdAt' });
  };

  return (
    <section className="flex flex-wrap justify-between gap-5 p-5">
      <div className="flex gap-3 items-center">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative w-full min-w-[320px]">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="tp-input w-full !pr-12"
              placeholder="Search by name, email, phone or address..."
            />
            <Button type="submit" size="icon" className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1">
              <RiSearch2Line className="!h-[18px] !w-[18px]" />
            </Button>
          </div>
        </form>

        {(query.trim() !== '' || role !== 'all' || status !== 'all' || sort !== '-createdAt') && (
          <button
            onClick={handleReset}
            type="button"
            className="flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg"
          >
            Reset <span className="ml-1"><GrPowerReset /></span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={role} onValueChange={(value) => { setRole(value); onChange({ search: query, role: value || 'all', status: status || 'all', sort: sort || '-createdAt' }); }}>
          <SelectTrigger className="w-[170px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="GUIDE">Guide</SelectItem>
            <SelectItem value="USER">User</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={(value) => { setStatus(value); onChange({ search: query, role: role || 'all', status: value || 'all', sort: sort || '-createdAt' }); }}>
          <SelectTrigger className="w-[170px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="BLOCKED">Blocked</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(value) => { setSort(value); onChange({ search: query, role: role || 'all', status: status || 'all', sort: value || '-createdAt' }); }}>
          <SelectTrigger className="w-[180px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="-createdAt">Newest</SelectItem>
            <SelectItem value="createdAt">Oldest</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="-name">Name Z-A</SelectItem>
            <SelectItem value="email">Email A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default TableFilter;