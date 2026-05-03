export type DashboardStats = {
    totalRevenue: number;
    totalBookings: number;
    activeUsers: number;
    averageRating: number;
};

export type DashboardTrend = {
    revenueChange: number;
    bookingsChange: number;
    activeUsersChange: number;
    averageRatingChange: number;
};

export type RevenueDataItem = {
    month: string;
    revenue: number;
    bookings: number;
};

export type DestinationDataItem = {
    name: string;
    value: number;
    color: string;
};

export type RecentBookingItem = {
    id: string;
    customer: string;
    destination: string;
    amount: number;
    status: string;
    date: string;
    rating: number | null;
};

export type DashboardResponse = {
    stats: DashboardStats;
    trend: DashboardTrend;
    revenueData: RevenueDataItem[];
    destinationData: DestinationDataItem[];
    recentBookings: RecentBookingItem[];
};
