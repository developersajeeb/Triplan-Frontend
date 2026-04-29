import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {
    Users,
    DollarSign,
    Calendar,
    MapPin,
    Star,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Download,
    Filter,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

// Static Data
const revenueData = [
    { month: 'Jan', revenue: 24000, bookings: 40 },
    { month: 'Feb', revenue: 32000, bookings: 45 },
    { month: 'Mar', revenue: 28000, bookings: 38 },
    { month: 'Apr', revenue: 42000, bookings: 52 },
    { month: 'May', revenue: 35000, bookings: 48 },
    { month: 'Jun', revenue: 48000, bookings: 60 },
];

const destinationData = [
    { name: 'Paris', value: 32, color: '#3b82f6' },
    { name: 'Tokyo', value: 28, color: '#10b981' },
    { name: 'Bali', value: 25, color: '#f59e0b' },
    { name: 'Dubai', value: 15, color: '#ef4444' },
];

const recentBookings = [
    {
        id: 1,
        customer: 'John Doe',
        destination: 'Paris',
        amount: '$2,400',
        status: 'Completed',
        date: '2024-04-28',
        rating: 4.8,
    },
    {
        id: 2,
        customer: 'Sarah Smith',
        destination: 'Tokyo',
        amount: '$1,800',
        status: 'Pending',
        date: '2024-04-27',
        rating: null,
    },
    {
        id: 3,
        customer: 'Mike Johnson',
        destination: 'Bali',
        amount: '$1,500',
        status: 'Completed',
        date: '2024-04-26',
        rating: 4.5,
    },
    {
        id: 4,
        customer: 'Emma Wilson',
        destination: 'Dubai',
        amount: '$3,200',
        status: 'Completed',
        date: '2024-04-25',
        rating: 5.0,
    },
];

const stats = [
    {
        title: 'Total Revenue',
        value: '$209,400',
        change: '+12.5%',
        isPositive: true,
        icon: DollarSign,
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Total Bookings',
        value: '283',
        change: '+8.2%',
        isPositive: true,
        icon: Calendar,
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
    },
    {
        title: 'Active Users',
        value: '1,847',
        change: '+5.1%',
        isPositive: true,
        icon: Users,
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600',
    },
    {
        title: 'Avg Rating',
        value: '4.6/5',
        change: '+0.3%',
        isPositive: true,
        icon: Star,
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600',
    },
];

const AdminDashboard = () => {
    return (
        <>
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                        <p className="text-slate-600 mt-2">
                            Welcome back! Here's what's happening with your tours today.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Filter
                        </Button>
                        <Button size="sm" className="gap-2">
                            <Download className="w-4 h-4" />
                            Export
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Revenue & Bookings Chart */}
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
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueData}>
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
                    </div>
                </Card>

                {/* Top Destinations Pie Chart */}
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
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={destinationData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) =>
                                        `${name} ${value}`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {destinationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Recent Bookings Table */}
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
                    <Button variant="outline" size="sm">
                        View All
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow className="border-slate-200">
                                <TableHead className="font-semibold text-slate-900">
                                    Customer
                                </TableHead>
                                <TableHead className="font-semibold text-slate-900">
                                    Destination
                                </TableHead>
                                <TableHead className="font-semibold text-slate-900">
                                    Amount
                                </TableHead>
                                <TableHead className="font-semibold text-slate-900">
                                    Date
                                </TableHead>
                                <TableHead className="font-semibold text-slate-900">
                                    Status
                                </TableHead>
                                <TableHead className="font-semibold text-slate-900">
                                    Rating
                                </TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentBookings.map((booking) => (
                                <TableRow
                                    key={booking.id}
                                    className="border-slate-200 hover:bg-slate-50 transition-colors"
                                >
                                    <TableCell className="font-medium text-slate-900">
                                        {booking.customer}
                                    </TableCell>
                                    <TableCell className="text-slate-700">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            {booking.destination}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-semibold text-slate-900">
                                        {booking.amount}
                                    </TableCell>
                                    <TableCell className="text-slate-600">
                                        {booking.date}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'Completed'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-yellow-50 text-yellow-700'
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {booking.rating ? (
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium text-slate-900">
                                                    {booking.rating}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 text-sm">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div></Card>
        </>
    );
};

export default AdminDashboard;