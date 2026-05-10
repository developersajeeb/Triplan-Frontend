import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RiSearch2Line } from 'react-icons/ri';
import { GrPowerReset } from 'react-icons/gr';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type ReviewFilters = {
  search: string;
  sort: string;
};

type Props = {
  onChange: (filters: ReviewFilters) => void;
  initialSearch?: string;
  initialSort?: string;
};

const TableFilter: React.FC<Props> = ({
  onChange,
  initialSearch = '',
  initialSort = 'newest',
}) => {
  const [query, setQuery] = useState(initialSearch);
  const [sort, setSort] = useState(initialSort || 'newest');

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setSort(initialSort || 'newest');
  }, [initialSort]);

  const handleSearchSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();
    onChange({
      search: query,
      sort: sort || 'newest',
    });
  };

  const handleReset = () => {
    setQuery('');
    setSort('newest');
    onChange({ search: '', sort: 'newest' });
  };

  return (
    <section className="flex flex-wrap justify-between gap-5 p-5">
      <div className="flex gap-3 items-center">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative w-full min-w-[280px]">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="tp-input w-full !pr-12"
              placeholder="Search by user name or email..."
            />
            <Button type="submit" size="icon" className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1">
              <RiSearch2Line className="!h-[18px] !w-[18px]" />
            </Button>
          </div>
        </form>

        {(query.trim() !== '' || sort !== 'newest') && (
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
        <Select
          value={sort}
          onValueChange={(nextSort) => {
            const value = nextSort || 'newest';
            setSort(value);
            onChange({ search: query, sort: value });
          }}
        >
          <SelectTrigger className="w-[170px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default TableFilter;
