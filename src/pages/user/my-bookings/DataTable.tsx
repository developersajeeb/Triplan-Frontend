import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/config";
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router"
import { useMemo } from "react"
import { FaRegFilePdf } from "react-icons/fa6"
import type { IBookingBatch, IBookingRecord, IMyBookingsDataTableProps } from "@/types"

const normalizeStatus = (status?: string) => (status ?? "").toLowerCase();

const parseDate = (value?: string) => {
    if (!value) {
        return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return date;
};

const formatBookingDate = (value?: string) => {
    if (!value) {
        return "N/A";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

const getBookingBatches = (booking: IBookingRecord): IBookingBatch[] => {
    if (Array.isArray(booking.batches) && booking.batches.length > 0) {
        return booking.batches;
    }

    return [
        {
            _id: booking._id,
            title: booking.title,
            startDate: booking.startDate,
            endDate: booking.endDate,
            date: booking.date,
            bookingStatus: booking.bookingStatus,
            status: booking.status,
            travelers: booking.travelers,
            travelerCount: booking.travelerCount,
            adult: booking.adult,
            adults: booking.adults,
            child: booking.child,
            children: booking.children,
            passengerCount: booking.passengerCount,
            pax: booking.pax,
            guestCount: booking.guestCount,
            payment: booking.payment,
        },
    ];
};

const getBatchNo = (batch: IBookingBatch, fallbackIndex: number) => {
    const value = batch.batchNo ?? batch.batchNumber;

    if (value !== undefined && value !== null && `${value}`.trim() !== "") {
        return String(value);
    }

    return String(fallbackIndex + 1);
};

const getBookingDetailsUrl = (booking: IBookingRecord) => {
    const slug = booking.tour?.slug ?? booking.slug;
    return slug ? `/tours/${slug}` : "/tours";
};

const getTourStatus = (batch: IBookingBatch, booking: IBookingRecord) => {
    const endDate = parseDate(batch.endDate ?? booking.endDate ?? booking.tour?.endDate);

    if (!endDate) {
        return "Upcoming";
    }

    const today = new Date();
    const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endAtMidnight = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    if (todayAtMidnight > endAtMidnight) {
        return "Done";
    }

    return "Upcoming";
};

const getTourStatusClassName = (status: string) => {
    const normalized = normalizeStatus(status);

    if (normalized.includes("done")) {
        return "bg-green-200 text-green-700";
    }

    return "bg-blue-100 text-blue-700";
};

const getGuestsLabel = (batch: IBookingBatch, booking: IBookingRecord) => {
    const travelerCount =
        batch.travelers ??
        batch.travelerCount ??
        batch.passengerCount ??
        batch.pax ??
        batch.guestCount ??
        booking.travelers ??
        booking.travelerCount ??
        booking.passengerCount ??
        booking.pax ??
        booking.guestCount;

    if (typeof travelerCount === "number" && Number.isFinite(travelerCount) && travelerCount > 0) {
        return `${travelerCount} Guest${travelerCount > 1 ? "s" : ""}`;
    }

    const adults = batch.adults ?? batch.adult ?? booking.adults ?? booking.adult;
    const children = batch.children ?? batch.child ?? booking.children ?? booking.child;
    const parts = [
        typeof adults === "number" && adults > 0 ? `${adults} Adult${adults > 1 ? "s" : ""}` : null,
        typeof children === "number" && children > 0 ? `${children} Child${children > 1 ? "ren" : ""}` : null,
    ].filter(Boolean);

    if (parts.length > 0) {
        return parts.join(", ");
    }

    return "N/A";
};

export function DataTable({ bookings = [], isLoading }: IMyBookingsDataTableProps) {
    const rows = useMemo(() => {
        const sourceBookings = Array.isArray(bookings) ? bookings : [];
        return sourceBookings
            .filter((booking): booking is IBookingRecord => Boolean(booking && typeof booking === "object"))
            .flatMap((booking) => getBookingBatches(booking).map((batch) => ({ booking, batch })));
    }, [bookings]);

    return (
        <Table className="table-fixed min-w-[767px]">
            <TableCaption>A list of your bookings.</TableCaption>
            <TableHeader>
                <TableRow className="bg-primary-50 hover:bg-primary-50">
                    <TableHead className="text-sm font-bold py-3 pl-6 min-w-[70px] md:min-w-0">No.</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[110px] md:min-w-0">Batch</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[220px] md:min-w-0">Title</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[130px] md:min-w-0">Guests</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[110px] md:min-w-0">Status</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[170px] md:min-w-0">Date</TableHead>
                    <TableHead className="text-sm font-bold py-3 min-w-[110px] md:min-w-0">Amount</TableHead>
                    <TableHead className="text-sm font-bold py-3 pr-6 text-right min-w-[130px] md:min-w-0">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={`booking-skeleton-${index}`}>
                            <TableCell className="pl-6 py-3 min-w-[70px] md:min-w-0">
                                <Skeleton className="h-4 w-7" />
                            </TableCell>
                            <TableCell className="py-3 min-w-[110px] md:min-w-0">
                                <Skeleton className="h-4 w-16" />
                            </TableCell>
                            <TableCell className="py-3 min-w-[220px] md:min-w-0">
                                <Skeleton className="h-4 w-full max-w-[220px]" />
                            </TableCell>
                            <TableCell className="py-3 min-w-[130px] md:min-w-0">
                                <Skeleton className="h-4 w-24" />
                            </TableCell>
                            <TableCell className="py-3 min-w-[110px] md:min-w-0">
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </TableCell>
                            <TableCell className="py-3 min-w-[170px] md:min-w-0">
                                <Skeleton className="h-4 w-32" />
                            </TableCell>
                            <TableCell className="py-3 min-w-[110px] md:min-w-0">
                                <Skeleton className="h-4 w-20" />
                            </TableCell>
                            <TableCell className="py-3 pr-6 min-w-[130px] md:min-w-0">
                                <div className="flex justify-end gap-2">
                                    <Skeleton className="h-8 w-14 rounded-lg" />
                                    <Skeleton className="h-8 w-14 rounded-lg" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : rows.length > 0 ? (
                    rows.map(({ booking, batch }, index) => {
                        const batchNo = getBatchNo(batch, index);
                        const detailsUrl = getBookingDetailsUrl(booking);
                        const rowStatus = getTourStatus(batch, booking);
                        const invoiceUrl = batch.payment?.invoiceUrl ?? booking.payment?.invoiceUrl;
                        const amount = batch.payment?.amount ?? booking.payment?.amount;
                        const startDate = formatBookingDate(batch.startDate ?? batch.date ?? booking.startDate ?? booking.date ?? booking.tour?.startDate);
                        const endDate = formatBookingDate(batch.endDate ?? booking.endDate ?? booking.tour?.endDate);

                        return (
                            <TableRow key={`${booking._id ?? detailsUrl}-${batch._id ?? batchNo}-${index}`}>
                                <TableCell className="font-medium pl-6 text-gray-800 py-3 min-w-[70px] md:min-w-0">{String(index + 1).padStart(2, "0")}</TableCell>
                                <TableCell className="py-3 font-medium text-gray-800 min-w-[110px] md:min-w-0">#{batchNo}</TableCell>
                                <TableCell className="py-3 min-w-[220px] md:min-w-0 overflow-hidden">
                                    <Link
                                        to={detailsUrl}
                                        className="block w-full truncate font-medium text-gray-800 hover:text-primary-500 duration-300"
                                        title={batch.title ?? booking.tour?.title ?? booking.title ?? "Tour details"}
                                    >
                                        {batch.title ?? booking.tour?.title ?? booking.title ?? "Tour details"}
                                    </Link>
                                </TableCell>
                                <TableCell className="py-3 font-medium text-gray-800 min-w-[130px] md:min-w-0">{getGuestsLabel(batch, booking)}</TableCell>
                                <TableCell className="py-3 min-w-[110px] md:min-w-0">
                                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getTourStatusClassName(rowStatus)}`}>
                                        {rowStatus}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3 font-medium text-gray-800 min-w-[170px] md:min-w-0">
                                    {startDate}
                                    {endDate !== "N/A" && (
                                        <span className="text-gray-500"> - {endDate}</span>
                                    )}
                                </TableCell>
                                <TableCell className="py-3 font-medium text-gray-800 min-w-[110px] md:min-w-0">{formatCurrency(amount)}</TableCell>
                                <TableCell className="py-3 pr-6 min-w-[130px] md:min-w-0">
                                    <div className="flex justify-end gap-2 flex-wrap">
                                        <Link
                                            to={detailsUrl}
                                            className="bg-primary-900 hover:bg-primary-400 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300"
                                        >
                                            View
                                        </Link>
                                        {invoiceUrl ? (
                                            <a
                                                href={invoiceUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center duration-300"
                                            >
                                                PDF <FaRegFilePdf />
                                            </a>
                                        ) : (
                                            <span className="bg-red-200 text-red-700 px-3 py-1 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-center cursor-not-allowed">
                                                PDF <FaRegFilePdf />
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })
                ) : (
                    <TableRow>
                        <TableCell className="py-10 text-center text-gray-500" colSpan={8}>
                            No booking found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}