import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { DestinationDataItem } from '@/types/dashboard.type';

interface DestinationsChartProps {
    data: DestinationDataItem[];
    isLoading: boolean;
    isFetching: boolean;
}

const DestinationsChart: React.FC<DestinationsChartProps> = ({ data, isLoading, isFetching }) => {
    return (
        <Card className="bg-white border-0 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                    Top Destinations
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                    By booking volume
                </p>
            </div>
            <div className="p-6">
                {(isLoading || isFetching)
                    ? <Skeleton className="h-[250px] w-full rounded-xl" />
                    : (
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name} ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
            </div>
        </Card>
    );
};

export default DestinationsChart;
