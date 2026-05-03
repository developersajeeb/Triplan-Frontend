import React from 'react';
import {
    Users,
    DollarSign,
    Calendar,
    Star,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { DashboardResponse } from '@/types/dashboard.type';
import { formatCurrency } from '@/config';

interface StatsCardsProps {
    summary: DashboardResponse | undefined;
    isLoading: boolean;
    isFetching: boolean;
}

const formatTrend = (value: number) => `${value >= 0 ? '+' : ''}${value}%`;

const StatsCards: React.FC<StatsCardsProps> = ({ summary, isLoading, isFetching }) => {
    const stats = [
        {
            title: 'Total Revenue',
            value: formatCurrency(summary?.stats?.totalRevenue ?? 0),
            change: formatTrend(summary?.trend?.revenueChange ?? 0),
            isPositive: (summary?.trend?.revenueChange ?? 0) >= 0,
            icon: DollarSign,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
        },
        {
            title: 'Total Bookings',
            value: String(summary?.stats?.totalBookings ?? 0),
            change: formatTrend(summary?.trend?.bookingsChange ?? 0),
            isPositive: (summary?.trend?.bookingsChange ?? 0) >= 0,
            icon: Calendar,
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600',
        },
        {
            title: 'Active Users',
            value: String(summary?.stats?.activeUsers ?? 0),
            change: formatTrend(summary?.trend?.activeUsersChange ?? 0),
            isPositive: (summary?.trend?.activeUsersChange ?? 0) >= 0,
            icon: Users,
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
        },
        {
            title: 'Avg Rating',
            value: `${(summary?.stats?.averageRating ?? 0).toFixed(1)}/5`,
            change: formatTrend(summary?.trend?.averageRatingChange ?? 0),
            isPositive: (summary?.trend?.averageRatingChange ?? 0) >= 0,
            icon: Star,
            bgColor: 'bg-yellow-50',
            iconColor: 'text-yellow-600',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {(isLoading || isFetching)
                ? [...Array(4)].map((_, index) => (
                    <Card key={index} className="overflow-hidden bg-white border-0">
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-12 w-12 rounded-lg" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-32" />
                            </div>
                        </div>
                    </Card>
                ))
                : stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card
                            key={index}
                            className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border-0"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                                        <Icon className={`${stat.iconColor} w-6 h-6`} />
                                    </div>
                                    <div
                                        className={`flex items-center gap-1 text-sm font-semibold ${stat.isPositive
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                            }`}
                                    >
                                        {stat.isPositive ? (
                                            <ArrowUpRight className="w-4 h-4" />
                                        ) : (
                                            <ArrowDownRight className="w-4 h-4" />
                                        )}
                                        {stat.change}
                                    </div>
                                </div>
                                <h3 className="text-slate-600 text-sm font-medium mb-1">
                                    {stat.title}
                                </h3>
                                <p className="text-2xl font-bold text-slate-900">
                                    {stat.value}
                                </p>
                            </div>
                        </Card>
                    );
                })}
        </div>
    );
};

export default StatsCards;
