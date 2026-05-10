import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RiSearch2Line } from 'react-icons/ri';
import { GrPowerReset } from 'react-icons/gr';

export type Filters = {
  search: string;
};

interface Props {
  onChange: (filters: Filters) => void;
  initialSearch?: string;
}

const TableFilter: React.FC<Props> = ({
  onChange,
  initialSearch = '',
}) => {
  const [query, setQuery] = useState(initialSearch);

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onChange({ search: query });
  };

  const handleReset = () => {
    setQuery('');
    onChange({ search: '' });
  };

  return (
    <section className="flex flex-wrap justify-between gap-5 p-5">
      <div className="flex gap-3 items-center">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative w-full min-w-[240px]">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="tp-input w-full !pr-12"
              placeholder="Search destination name..."
            />
            <Button
              type="submit"
              size="icon"
              className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1"
            >
              <RiSearch2Line className="!h-[18px] !w-[18px]" />
            </Button>
          </div>
        </form>

        {query.trim() !== '' && (
          <button
            onClick={handleReset}
            type="button"
            className="flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg"
          >
            Reset <span className="ml-1"><GrPowerReset /></span>
          </button>
        )}
      </div>
    </section>
  );
};

export default TableFilter;
