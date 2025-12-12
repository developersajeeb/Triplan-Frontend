import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Link } from "react-router"

const invoices = [
    {
        invoice: "01",
        title: "This is tour title",
        paymentStatus: "Paid",
        tourStatus: "Upcoming",
    },
    {
        invoice: "01",
        title: "This is tour title",
        paymentStatus: "Failed",
        tourStatus: "Done",
    },
    {
        invoice: "01",
        title: "This is tour title",
        paymentStatus: "Cancel",
        tourStatus: "Upcoming",
    }
]

export function DataTable() {
    return (
        <Table>
            <TableCaption>A list of your bookings.</TableCaption>
            <TableHeader>
                <TableRow className="bg-primary-50 hover:bg-primary-50">
                    <TableHead className="text-sm font-bold py-3 pl-6 w-[50px]">No.</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[160px]">Title</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[100px]">Travelers</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[90px]">Tour Status</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[80px]">Date</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[60px]">Payment</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[60px]">Amount</TableHead>
                    <TableHead className="text-sm font-bold py-3 pr-6">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium pl-6 text-gray-800 py-3">{invoice.invoice}</TableCell>
                        <TableCell className="py-3"><Link to={'/tour/slug'} className="font-medium text-gray-800 hover:text-primary-500 duration-300">{invoice.title}</Link></TableCell>
                        <TableCell className="py-3 font-medium text-gray-800">2 Adults, 1 Child</TableCell>
                        <TableCell className="py-3">
                            {invoice.tourStatus === "Upcoming" ? (
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Upcoming</span>
                            ) : invoice.tourStatus === "Done" ? (
                                <span className="bg-green-200 text-green-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Done</span>
                            ) : null}
                        </TableCell>
                        <TableCell className="py-3 font-medium text-gray-800">15 May 2026</TableCell>
                        <TableCell className="py-3">
                            {invoice.paymentStatus === "Paid" ? (
                                <span className="bg-green-200 text-green-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Paid</span>
                            ) : invoice.paymentStatus === "Failed" ? (
                                <span className="bg-red-200 text-red-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Failed</span>
                            ) : invoice.paymentStatus === "Cancel" ? (
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Cancel</span>
                            ) : null}
                        </TableCell>
                        <TableCell className="py-3 font-medium text-gray-800">৳25000</TableCell>
                        <TableCell className="text-right pr-6 py-3 flex gap-2">
                            <Link to={'tour/slug'} className="bg-primary-900 hover:bg-primary-400 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300">View</Link>
                            <Link to={'tour/slug'} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300">PDF</Link>
                            <Link to={'tour/slug'} className="bg-purple-500 hover:bg-purple-700 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300">Ticket</Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}