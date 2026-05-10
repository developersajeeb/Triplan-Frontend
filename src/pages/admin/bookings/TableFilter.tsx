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
  status: string;
  paymentStatus: string;
  sort: string;
};

interface Props {
  onChange: (filters: Filters) => void;
  initialSearch?: string;
  initialStatus?: string;
  initialPaymentStatus?: string;
  initialSort?: string;
}

const TableFilter: React.FC<Props> = ({
  onChange,
  initialSearch = '',
  initialStatus = 'all',
  initialPaymentStatus = 'all',
  initialSort = 'newest',
}) => {
  const [query, setQuery] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus || 'all');
  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus || 'all');
  const [sort, setSort] = useState(initialSort || 'newest');

  useEffect(() => {
    setQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setStatus(initialStatus || 'all');
  }, [initialStatus]);

  useEffect(() => {
    setPaymentStatus(initialPaymentStatus || 'all');
  }, [initialPaymentStatus]);

  useEffect(() => {
    setSort(initialSort || 'newest');
  }, [initialSort]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onChange({
      search: query,
      status: status || 'all',
      paymentStatus: paymentStatus || 'all',
      sort: sort || 'newest'
    });
  };

  const handleReset = () => {
    setQuery('');
    setStatus('all');
    setPaymentStatus('all');
    setSort('newest');
    onChange({ search: '', status: 'all', paymentStatus: 'all', sort: 'newest' });
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
              placeholder="Search by customer or tour name..."
            />
            <Button type="submit" size="icon" className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1">
              <RiSearch2Line className="!h-[18px] !w-[18px]" />
            </Button>
          </div>
        </form>

        {(query.trim() !== '' || status !== 'all' || paymentStatus !== 'all' || sort !== 'newest') && (
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
          value={status}
          onValueChange={(v) => {
            setStatus(v);
            onChange({
              search: query,
              status: v || 'all',
              paymentStatus: paymentStatus || 'all',
              sort: sort || 'newest'
            });
          }}
        >
          <SelectTrigger className="w-[180px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={paymentStatus}
          onValueChange={(v) => {
            setPaymentStatus(v);
            onChange({
              search: query,
              status: status || 'all',
              paymentStatus: v || 'all',
              sort: sort || 'newest'
            });
          }}
        >
          <SelectTrigger className="w-[180px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(v) => {
            setSort(v);
            onChange({
              search: query,
              status: status || 'all',
              paymentStatus: paymentStatus || 'all',
              sort: v || 'newest'
            });
          }}
        >
          <SelectTrigger className="w-[170px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="amountHighToLow">Amount: High to Low</SelectItem>
            <SelectItem value="amountLowToHigh">Amount: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default TableFilter;
