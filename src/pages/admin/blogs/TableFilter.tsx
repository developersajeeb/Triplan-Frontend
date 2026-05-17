import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RiSearch2Line } from 'react-icons/ri';
import { GrPowerReset } from 'react-icons/gr';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type BlogFilters = {
  search: string;
  category: string;
  status: string;
  sort: string;
};

type Props = {
  onChange: (filters: BlogFilters) => void;
  categories: string[];
  initialSearch?: string;
  initialCategory?: string;
  initialStatus?: string;
  initialSort?: string;
};

const TableFilter: React.FC<Props> = ({
  onChange,
  categories,
  initialSearch = '',
  initialCategory = 'all',
  initialStatus = 'all',
  initialSort = 'newest',
}) => {
  const [query, setQuery] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory || 'all');
  const [status, setStatus] = useState(initialStatus || 'all');
  const [sort, setSort] = useState(initialSort || 'newest');

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setCategory(initialCategory || 'all');
  }, [initialCategory]);

  useEffect(() => {
    setStatus(initialStatus || 'all');
  }, [initialStatus]);

  useEffect(() => {
    setSort(initialSort || 'newest');
  }, [initialSort]);

  const handleSearchSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();
    onChange({ search: query, category, status, sort: sort || 'newest' });
  };

  const handleReset = () => {
    setQuery('');
    setCategory('all');
    setStatus('all');
    setSort('newest');
    onChange({ search: '', category: 'all', status: 'all', sort: 'newest' });
  };

  const hasActiveFilters = query.trim() !== '' || category !== 'all' || status !== 'all' || sort !== 'newest';

  return (
    <section className="flex flex-wrap justify-between gap-5 p-5">
      <div className="flex gap-3 items-center flex-wrap">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative w-full min-w-[280px] max-w-[360px]">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="tp-input w-full !pr-12"
              placeholder="Search by title or excerpt..."
            />
            <Button type="submit" size="icon" className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1">
              <RiSearch2Line className="!h-[18px] !w-[18px]" />
            </Button>
          </div>
        </form>

        {hasActiveFilters && (
          <button onClick={handleReset} type="button" className="flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg">
            Reset <span className="ml-1"><GrPowerReset /></span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={category} onValueChange={(value) => { setCategory(value); onChange({ search: query, category: value || 'all', status, sort }); }}>
          <SelectTrigger className="w-[170px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={(value) => { setStatus(value); onChange({ search: query, category, status: value || 'all', sort }); }}>
          <SelectTrigger className="w-[150px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="All status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(value) => { setSort(value); onChange({ search: query, category, status, sort: value || 'newest' }); }}>
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
