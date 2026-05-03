import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RiSearch2Line } from 'react-icons/ri';
import { GrPowerReset } from 'react-icons/gr';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export type Filters = {
  search: string;
  status: string; // 'all' | 'active' | 'draft' etc
  sort: string;
};

interface Props {
  onChange: (filters: Filters) => void;
}

const TableFilter: React.FC<Props> = ({ onChange }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    // initialize empty
    onChange({ search: query, status: status || 'all', sort });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onChange({ search: query, status: status || 'all', sort });
  };

  const handleReset = () => {
    setQuery('');
    setStatus('all');
    setSort('newest');
    onChange({ search: '', status: 'all', sort: 'newest' });
  };

  return (
    <section className="flex flex-wrap justify-between gap-5 p-5">
      <div className="flex gap-3 items-center">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative w-full max-w-[360px]">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="tp-input w-full !pr-12"
                placeholder="Search by tour name..."
              />
            <Button type="submit" size="icon" className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1">
              <RiSearch2Line className="!h-[18px] !w-[18px]" />
            </Button>
          </div>
        </form>

        {(query.trim() !== '' || status !== 'all' || sort !== 'newest') && (
          <button onClick={handleReset} type="button" className="flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg">
            Reset <span className="ml-1"><GrPowerReset /></span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={status} onValueChange={(v) => { setStatus(v); onChange({ search: query, status: v || 'all', sort }); }}>
          <SelectTrigger className="w-[160px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => { setSort(v); onChange({ search: query, status: status || 'all', sort: v || 'newest' }); }}>
          <SelectTrigger className="w-[180px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="Sort by bookings" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="bookingsHighToLow">Bookings: High to Low</SelectItem>
            <SelectItem value="bookingsLowToHigh">Bookings: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default TableFilter;
