import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FiDownloadCloud } from "react-icons/fi"
import { Link, useSearchParams } from "react-router"
import { formatCurrency } from "@/config";
import { useGetMyPaymentsQuery } from "@/redux/features/payment/payment.api";
import { Skeleton } from "@/components/ui/skeleton";
import type { IPaymentData } from "@/redux/features/payment/payment.api";

export function DataTable() {
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    const { data, isLoading, isFetching, error } = useGetMyPaymentsQuery({
        page,
        limit: 10,
        search,
        status,
        startDate,
        endDate,
    });

    const payments: IPaymentData[] = data?.result || [];
    const meta = data?.meta || {};

    const getStatusBadge = (statusValue: string) => {
        switch (statusValue) {
            case "PAID":
                return <span className="bg-green-200 text-green-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Paid</span>;
            case "FAILED":
                return <span className="bg-red-200 text-red-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Failed</span>;
            case "CANCELLED":
                return <span className="bg-gray-200 text-gray-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Cancel</span>;
            case "UNPAID":
                return <span className="bg-yellow-200 text-yellow-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Unpaid</span>;
            default:
                return <span className="bg-gray-200 text-gray-700 px-3 py-1 inline-block rounded-full text-xs font-medium">{statusValue}</span>;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };

    const handleDownloadInvoice = (invoiceUrl: string | undefined) => {
        if (invoiceUrl) {
            window.open(invoiceUrl, "_blank");
        }
    };

    const renderHeader = () => (
        <TableHeader>
            <TableRow className="bg-primary-50 hover:bg-primary-50">
                <TableHead className="text-sm font-bold py-3 pl-6 w-[120px]">Transaction ID</TableHead>
                <TableHead className="text-sm font-bold py-3 min-w-[200px]">Tour Title</TableHead>
                <TableHead className="text-sm font-bold py-3 min-w-[80px]">Batch</TableHead>
                <TableHead className="text-sm font-bold py-3 min-w-[130px]">Pay Date</TableHead>
                <TableHead className="text-sm font-bold py-3 min-w-[100px]">Amount</TableHead>
                <TableHead className="text-sm font-bold py-3 min-w-[100px]">Status</TableHead>
                <TableHead className="text-sm font-bold py-3 pr-6">Actions</TableHead>
            </TableRow>
        </TableHeader>
    );

    if (isLoading || isFetching) {
        return (
            <Table>
                {renderHeader()}
                <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <TableRow key={i}>
                            <TableCell className="py-3"><Skeleton className="h-4 w-20" /></TableCell>
                            <TableCell className="py-3"><Skeleton className="h-4 w-32" /></TableCell>
                            <TableCell className="py-3"><Skeleton className="h-4 w-16" /></TableCell>
                            <TableCell className="py-3"><Skeleton className="h-4 w-24" /></TableCell>
                            <TableCell className="py-3"><Skeleton className="h-4 w-20" /></TableCell>
                            <TableCell className="py-3"><Skeleton className="h-4 w-16" /></TableCell>
                            <TableCell className="py-3"><Skeleton className="h-4 w-24" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    if (error) {
        return (
            <Table>
                <TableCaption>No payment data found.</TableCaption>
                {renderHeader()}
                <TableBody />
            </Table>
        );
    }

    return (
        <Table>
            <TableCaption>
                {payments.length === 0 ? "No payment records found." : `Total ${meta.total} payments - page ${meta.page} / ${meta.totalPages}`}
            </TableCaption>
            {renderHeader()}
            <TableBody>
                {payments.map((payment) => (
                    <TableRow key={payment._id}>
                        <TableCell className="font-medium pl-6 text-primary-500 py-3">{payment.transactionId}</TableCell>
                        <TableCell className="py-3">
                            <Link to={`/tour/${payment.booking?.tour?._id}`} className="font-medium text-gray-800 hover:text-primary-500 duration-300">
                                {payment.booking?.tour?.title || "N/A"}
                            </Link>
                        </TableCell>
                        <TableCell className="py-3 font-medium text-gray-800">{payment.booking?.batchNo ?? payment.batchNo ?? "N/A"}</TableCell>
                        <TableCell className="py-3 font-medium text-gray-800">{formatDate(payment.createdAt)}</TableCell>
                        <TableCell className="py-3 font-medium text-gray-800">{formatCurrency(payment.amount)}</TableCell>
                        <TableCell className="py-3">
                            {getStatusBadge(payment.status)}
                        </TableCell>
                        <TableCell className="text-right pr-6 py-3 flex gap-2">
                            <button
                                onClick={() => handleDownloadInvoice(payment.invoiceUrl)}
                                disabled={!payment.invoiceUrl}
                                className={`${payment.invoiceUrl ? "bg-red-500 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"} text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300`}
                            >
                                Invoice <FiDownloadCloud />
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}