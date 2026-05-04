import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import type { RecentBookingItem } from '@/types/dashboard.type';
import { formatCurrency } from '@/config';
import { Link } from 'react-router';

interface RecentBookingsTableProps {
    data: RecentBookingItem[];
    isLoading: boolean;
    isFetching: boolean;
}

const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
};

const normalizeStatus = (status: string) => status.toLowerCase();

const RecentBookingsTable: React.FC<RecentBookingsTableProps> = ({ data, isLoading, isFetching }) => {
    
    return (
        <Card className="bg-white border-0 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        Recent Bookings
                    </h2>
                    <p className="text-slate-600 text-sm mt-1">
                        Latest 4 bookings
                    </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                    <Link to="/admin/bookings">View All</Link>
                </Button>
            </div>
            <div className="overflow-x-auto pb-5">
                <Table className="min-w-[900px]">
                    <TableCaption>Recent bookings</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-primary-50 hover:bg-primary-50">
                            <TableHead className="min-w-[50px] max-w-[50px] text-sm font-bold py-3 pl-6">No.</TableHead>
                            <TableHead className="min-w-[150px] text-sm font-bold py-3">Customer</TableHead>
                            <TableHead className="min-w-[150px] text-sm font-bold py-3">Destination</TableHead>
                            <TableHead className="min-w-[100px] text-sm font-bold py-3">Amount</TableHead>
                            <TableHead className="min-w-[100px] text-sm font-bold py-3">Date</TableHead>
                            <TableHead className="min-w-[100px] text-sm font-bold py-3">Status</TableHead>
                            <TableHead className="min-w-[80px] text-sm font-bold py-3">Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(isLoading || isFetching)
                            ? [...Array(4)].map((_, index) => (
                                <TableRow key={index} className="border-slate-200">
                                    <TableCell className="pl-6"><Skeleton className="h-5 w-6" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                                </TableRow>
                            ))
                            : data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-10 text-center text-gray-500">
                                        No recent bookings found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((booking, index) => {
                                    const normalizedStatus = normalizeStatus(booking.status);
                                    const isCompleted = normalizedStatus.includes('complete');

                                    return (
                                        <TableRow
                                            key={booking.id}
                                            className="border-slate-200 hover:bg-slate-50 transition-colors"
                                        >
                                            <TableCell className="font-medium pl-6 text-gray-800 py-3">
                                                {String(index + 1).padStart(2, '0')}
                                            </TableCell>
                                            <TableCell className="py-3 font-medium text-slate-900">
                                                {booking.customer}
                                            </TableCell>
                                            <TableCell className="py-3 text-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-slate-400" />
                                                    {booking.destination}
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-3 font-semibold text-slate-900">
                                                {formatCurrency(booking.amount)}
                                            </TableCell>
                                            <TableCell className="py-3 text-slate-600">
                                                {formatDate(booking.date)}
                                            </TableCell>
                                            <TableCell className="py-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${isCompleted
                                                        ? 'bg-green-50 text-green-700'
                                                        : normalizedStatus.includes('pending')
                                                            ? 'bg-yellow-50 text-yellow-700'
                                                            : 'bg-slate-100 text-slate-700'
                                                        }`}
                                                >
                                                    {isCompleted ? 'Completed' : booking.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-3">
                                                {booking.rating ? (
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-sm font-medium text-slate-900">
                                                            {booking.rating.toFixed(1)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400 text-sm">—</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
};

export default RecentBookingsTable;
