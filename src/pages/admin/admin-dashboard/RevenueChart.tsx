import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { RevenueDataItem } from '@/types/dashboard.type';

interface RevenueChartProps {
    data: RevenueDataItem[];
    isLoading: boolean;
    isFetching: boolean;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, isLoading, isFetching }) => {
    return (
        <Card className="lg:col-span-2 bg-white border-0 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                    Revenue & Bookings Trend
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                    Last 6 months performance
                </p>
            </div>
            <div className="p-6">
                {(isLoading || isFetching)
                    ? <Skeleton className="h-[300px] w-full rounded-xl" />
                    : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e2e8f0"
                                />
                                <XAxis dataKey="month" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #475569',
                                        borderRadius: '8px',
                                    }}
                                    labelStyle={{ color: '#f1f5f9' }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="revenue"
                                    fill="#3b82f6"
                                    radius={[8, 8, 0, 0]}
                                />
                                <Bar
                                    dataKey="bookings"
                                    fill="#10b981"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
            </div>
        </Card>
    );
};

export default RevenueChart;
