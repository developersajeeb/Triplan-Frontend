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

export type EarningsFilters = {
  search: string;
  paymentStatus: string;
  sort: string;
};

interface Props {
  onChange: (filters: EarningsFilters) => void;
  initialSearch?: string;
  initialPaymentStatus?: string;
  initialSort?: string;
}

const EarningsFilter: React.FC<Props> = ({
  onChange,
  initialSearch = '',
  initialPaymentStatus = 'all',
  initialSort = '-createdAt',
}) => {
  const [query, setQuery] = useState(initialSearch);
  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus || 'all');
  const [sort, setSort] = useState(initialSort || '-createdAt');

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setPaymentStatus(initialPaymentStatus || 'all');
  }, [initialPaymentStatus]);

  useEffect(() => {
    setSort(initialSort || '-createdAt');
  }, [initialSort]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onChange({
      search: query,
      paymentStatus: paymentStatus || 'all',
      sort: sort || '-createdAt'
    });
  };

  const handleReset = () => {
    setQuery('');
    setPaymentStatus('all');
    setSort('-createdAt');
    onChange({ search: '', paymentStatus: 'all', sort: '-createdAt' });
  };

  return (
    <section className="flex flex-wrap justify-between gap-5 p-5">
      <div className="flex gap-3 items-center">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative w-full min-w-[300px]">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="tp-input w-full !pr-12"
              placeholder="Search by customer or destination..."
            />
            <Button type="submit" size="icon" className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1">
              <RiSearch2Line className="!h-[18px] !w-[18px]" />
            </Button>
          </div>
        </form>

        {(query.trim() !== '' || paymentStatus !== 'all' || sort !== '-createdAt') && (
          <button
            onClick={handleReset}
            type="button"
            className="flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg"
          >
            Reset <span className="ml-1"><GrPowerReset /></span>
          </button>
        )}
      </div>

      <div className="flex gap-3 items-center flex-wrap">
        <Select
          value={paymentStatus}
          onValueChange={(value) => {
            setPaymentStatus(value);
            onChange({
              search: query,
              paymentStatus: value || 'all',
              sort: sort || '-createdAt',
            });
          }}
        >
          <SelectTrigger className="w-[180px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancel">Cancel</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(value) => {
            setSort(value);
            onChange({
              search: query,
              paymentStatus: paymentStatus || 'all',
              sort: value || '-createdAt',
            });
          }}
        >
          <SelectTrigger className="w-[170px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-createdAt">Newest</SelectItem>
            <SelectItem value="createdAt">Oldest</SelectItem>
            <SelectItem value="amounthightolow">Amount: High to Low</SelectItem>
            <SelectItem value="amountlowtohigh">Amount: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default EarningsFilter;
