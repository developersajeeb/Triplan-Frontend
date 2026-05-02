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
};

interface Props {
  onChange: (filters: Filters) => void;
}

const TableFilter: React.FC<Props> = ({ onChange }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    // initialize empty
    onChange({ search: query, status: status || 'all' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onChange({ search: query, status: status || 'all' });
  };

  const handleReset = () => {
    setQuery('');
    setStatus('all');
    onChange({ search: '', status: 'all' });
  };

  return (
    <section className="flex justify-between gap-5 p-5">
      <div className="flex gap-3 items-center">
        <form onSubmit={handleSearchSubmit} className="w-full max-w-[360px] flex items-center gap-2">
          <div className="relative flex-1">
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

          {query && query.trim() !== '' && (
            <button onClick={handleReset} type="button" className="flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg">
              Reset <span className="ml-1"><GrPowerReset /></span>
            </button>
          )}
        </form>
      </div>

      <div>
        <Select value={status} onValueChange={(v) => { setStatus(v); onChange({ search: query, status: v || 'all' }); }}>
          <SelectTrigger className="w-[160px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <div className="border-t mt-2 pt-2 px-2 pb-1">
              <button type="button" onClick={handleReset} className="w-full text-center py-2 text-sm font-medium rounded-md bg-red-100 hover:bg-red-200 text-red-700">Reset</button>
            </div>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default TableFilter;
