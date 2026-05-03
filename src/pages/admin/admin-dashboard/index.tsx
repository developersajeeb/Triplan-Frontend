import { useGetAdminDashboardSummaryQuery } from '@/redux/features/booking/booking.api';
import type { DashboardResponse } from '@/types/dashboard.type';
import StatsCards from './StatsCards';
import RevenueChart from './RevenueChart';
import DestinationsChart from './DestinationsChart';
import RecentBookingsTable from './RecentBookingsTable';


const AdminDashboard = () => {
    const { data, isLoading, isFetching } = useGetAdminDashboardSummaryQuery();
    const summary = data as DashboardResponse | undefined;

    const revenueData = summary?.revenueData ?? [];
    const destinationData = summary?.destinationData ?? [];
    const recentBookings = summary?.recentBookings ?? [];

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-600 mt-2">
                    Welcome back! Here&apos;s what&apos;s happening with your tours today.
                </p>
            </div>
            <StatsCards summary={summary} isLoading={isLoading} isFetching={isFetching} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <RevenueChart data={revenueData} isLoading={isLoading} isFetching={isFetching} />
                <DestinationsChart data={destinationData} isLoading={isLoading} isFetching={isFetching} />
            </div>
            <RecentBookingsTable data={recentBookings} isLoading={isLoading} isFetching={isFetching} />
        </>
    );
};

export default AdminDashboard;