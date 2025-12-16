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
import { Link } from "react-router"

const invoices = [
    {
        invoice: "01546456",
        title: "This is tour title",
        paymentStatus: "Paid",
    },
    {
        invoice: "01234234",
        title: "This is tour title",
        paymentStatus: "Failed",
    },
    {
        invoice: "01989089",
        title: "This is tour title",
        paymentStatus: "Cancel",
    }
]

export function DataTable() {
    return (
        <Table>
            <TableCaption>A list of your payment.</TableCaption>
            <TableHeader>
                <TableRow className="bg-primary-50 hover:bg-primary-50">
                    <TableHead className="text-sm font-bold py-3 pl-6 w-[100px]">ID.</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[180px]">Title</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[120px]">Date</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[100px]">Amount</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[80px]">Status</TableHead>
                    <TableHead className="text-sm font-bold py-3 pr-6">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium pl-6 text-primary-500 py-3">{invoice.invoice}</TableCell>
                        <TableCell className="py-3"><Link to={'/tour/slug'} className="font-medium text-gray-800 hover:text-primary-500 duration-300">{invoice.title}</Link></TableCell>
                        <TableCell className="py-3 font-medium text-gray-800">15 May 2026</TableCell>
                        <TableCell className="py-3 font-medium text-gray-800">৳25000</TableCell>
                        <TableCell className="py-3">
                            {invoice.paymentStatus === "Paid" ? (
                                <span className="bg-green-200 text-green-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Paid</span>
                            ) : invoice.paymentStatus === "Failed" ? (
                                <span className="bg-red-200 text-red-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Failed</span>
                            ) : invoice.paymentStatus === "Cancel" ? (
                                <span className="bg-gray-200 text-gray-700 px-3 py-1 inline-block rounded-full text-xs font-medium">Cancel</span>
                            ) : null}
                        </TableCell>
                        <TableCell className="text-right pr-6 py-3 flex gap-2">
                            <Link to={'tour/slug'} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300">Download Invoice <FiDownloadCloud /></Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}