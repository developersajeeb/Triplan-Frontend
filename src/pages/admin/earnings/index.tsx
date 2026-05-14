'use client';

import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Download, FileText } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PaginationComponent from '@/components/ui/PaginationComponent';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetEarningsDetailsQuery, useGetEarningsQuery } from '@/redux/features/earnings/earnings.api';
import type { IEarningsData } from '@/redux/features/earnings/earnings.api';
import EarningsDataTable from './EarningsDataTable';
import EarningsFilter from './EarningsFilter';
import type { EarningsFilters } from './EarningsFilter';
import { buildEarningsReportPdf, type ExportRow as EarningsPdfRow } from './earnings-report-pdf';

const PIE_COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#6b7280', '#f97316'];

const escapeCsvCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(amount);

const Earnings = () => {
  // Table filtering state (isolated)
  const [tableFilters, setTableFilters] = useState({
    page: 1,
    search: '',
    paymentStatus: 'all',
    sort: '-createdAt',
  });

  // Dashboard data (independent query)
  const { data: earningsDetails, isLoading: isDetailsLoading } = useGetEarningsDetailsQuery();

  // Table data (separate query with isolated filters)
  const { data: earningsData, isLoading: isEarningsLoading, isFetching: isEarningsFetching } = useGetEarningsQuery({
    page: tableFilters.page,
    limit: 10,
    search: tableFilters.search,
    paymentStatus: tableFilters.paymentStatus,
    sort: tableFilters.sort,
  });

  // Unfiltered data for charts and distribution (always shows complete picture)
  const { data: allEarningsData } = useGetEarningsQuery({
    page: 1,
    limit: 1000,
    search: '',
    paymentStatus: 'all',
    sort: '-createdAt',
  });

  const handleFilterChange = (filters: EarningsFilters) => {
    setTableFilters({
      page: 1,
      search: filters.search || '',
      paymentStatus: filters.paymentStatus || 'all',
      sort: filters.sort || '-createdAt',
    });
  };

  const handlePageChange = (newPage: number) => {
    setTableFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportPDF = () => {
    const pdf = buildEarningsReportPdf({
      generatedAt: new Date(),
      totalRevenue: earningsDetails?.stats.totalRevenue || 0,
      totalBookings: earningsDetails?.stats.totalBookings || 0,
      activeUsers: earningsDetails?.stats.activeUsers || 0,
      averageRating: earningsDetails?.stats.averageRating || 0,
      rows: tableData,
    });

    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', 'earnings-report.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    window.URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    if (!earningsData?.data?.length) return;

    const rows: EarningsPdfRow[] = earningsData.data.map((item: IEarningsData) => ({
      customer: item.user?.name || item.customer || 'N/A',
      destination: (() => {
        const tour = item.tour as { title?: string; arrivalLocation?: string } | undefined;

        return tour?.arrivalLocation || tour?.title || item.destination || 'N/A';
      })(),
      guests: item.guestCount || 0,
      date: (() => {
        const payment = item.payment as { createdAt?: string } | undefined;
        const dateValue = payment?.createdAt || item.createdAt || item.date;

        return dateValue ? new Date(dateValue).toLocaleDateString('en-BD') : 'N/A';
      })(),
      amount: item.payment?.amount ?? item.amount ?? 0,
      status: item.payment?.status || item.status || 'N/A',
    }));

    const csv = [
      ['Customer', 'Destination', 'Guests', 'Date', 'Amount', 'Status'].join(','),
      ...rows.map((row) => [
        escapeCsvCell(row.customer),
        escapeCsvCell(row.destination),
        escapeCsvCell(row.guests),
        escapeCsvCell(row.date),
        escapeCsvCell(row.amount),
        escapeCsvCell(row.status),
      ].join(',')),
    ].join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', 'earnings-data.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const paymentStatusDistribution = useMemo(() => {
    if (!allEarningsData?.data?.length) return [];

    const statusMap = new Map<string, number>();

    allEarningsData.data.forEach((item: IEarningsData) => {
      const status = item.status || 'Unknown';
      statusMap.set(status, (statusMap.get(status) || 0) + 1);
    });

    return Array.from(statusMap.entries()).map(([status, count], index) => ({
      status,
      count,
      color: PIE_COLORS[index % PIE_COLORS.length],
    }));
  }, [allEarningsData?.data]);

  const tableData = useMemo(
    () =>
      (earningsData?.data || []).map((item: IEarningsData, index: number) => ({
        id: `${item.id || index}`,
        customer: item.user?.name || item.customer || 'N/A',
        destination: (() => {
          const tour = item.tour as { title?: string; arrivalLocation?: string } | undefined;

          return tour?.arrivalLocation || tour?.title || item.destination || 'N/A';
        })(),
        guests: item.guestCount || 0,
        date: (() => {
          const payment = item.payment as { createdAt?: string } | undefined;

          return payment?.createdAt || item.createdAt || item.date || '';
        })(),
        amount: item.payment?.amount ?? item.amount ?? 0,
        status: item.payment?.status || item.status || 'Unknown',
      })),
    [earningsData?.data],
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Earnings</h1>
          <p className="mt-1 text-slate-600">Track your revenue and payment metrics</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportPDF} variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
          <Button onClick={handleExportCSV} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isDetailsLoading ? (
          Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-32" />)
        ) : (
          <>
            <Card className="border-0 bg-white shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{formatCurrency(earningsDetails?.stats.totalRevenue || 0)}</div>
                <p className="mt-1 text-xs text-slate-500">All time earnings</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{earningsDetails?.stats.totalBookings || 0}</div>
                <div className="mt-1 flex items-center gap-1">
                  {(earningsDetails?.trend.bookingsChange || 0) >= 0 ? (
                    <>
                      <ArrowUp className="h-4 w-4 text-green-500" />
                      <p className="text-xs text-green-600">{earningsDetails?.trend.bookingsChange?.toFixed(1)}%</p>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="h-4 w-4 text-red-500" />
                      <p className="text-xs text-red-600">{Math.abs(earningsDetails?.trend.bookingsChange || 0).toFixed(1)}%</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{earningsDetails?.stats.activeUsers || 0}</div>
                <p className="mt-1 text-xs text-slate-500">Current period</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{(earningsDetails?.stats.averageRating || 0).toFixed(1)} ⭐</div>
                <p className="mt-1 text-xs text-slate-500">Customer satisfaction</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-0 bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Revenue Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            {isDetailsLoading ? (
              <Skeleton className="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsDetails?.revenueData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Booking Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            {isDetailsLoading ? (
              <Skeleton className="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={earningsDetails?.revenueData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" fill="#10b981" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {paymentStatusDistribution.length > 0 && (
          <Card className="border-0 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Payment Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {!allEarningsData ? (
                <Skeleton className="h-64" />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={paymentStatusDistribution} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100} label>
                      {paymentStatusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        )}

        {earningsDetails?.destinationData?.length ? (
          <Card className="border-0 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">Top Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              {isDetailsLoading ? (
                <Skeleton className="h-64" />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={earningsDetails.destinationData} layout="vertical" margin={{ top: 5, right: 30, left: 250, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={240} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        ) : null}
      </div>

      <Card className="border-0 bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Earnings Details</CardTitle>
        </CardHeader>
        <EarningsFilter
          onChange={handleFilterChange}
          initialSearch={tableFilters.search}
          initialPaymentStatus={tableFilters.paymentStatus}
          initialSort={tableFilters.sort}
        />
        <CardContent>
          <EarningsDataTable data={tableData} isLoading={isEarningsLoading || isEarningsFetching} />

          {earningsData?.meta ? (
            <div className="mt-6">
              <PaginationComponent currentPage={tableFilters.page} totalPages={earningsData.meta.totalPages || 1} onPageChange={handlePageChange} />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default Earnings;