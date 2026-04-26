import { IoCalendarOutline, IoHeartHalfOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuFolderOpen, LuTentTree, LuTimer } from "react-icons/lu";
import { TbLocationPin, TbMapPin2 } from "react-icons/tb";
import { Link } from "react-router";
import ImageWaterMark from '@/assets/images/image-watermark.webp'
import { FaLocationDot, FaRegFilePdf } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { useGetWishlistQuery } from "@/redux/features/user/user.api";
import { useGetMyBookingsQuery } from "@/redux/features/booking/booking.api";
import { Skeleton } from "@/components/ui/skeleton";

type TBookingRecord = {
    _id?: string;
    createdAt?: string;
    startDate?: string;
    date?: string;
    startTime?: string;
    endDate?: string;
    bookingStatus?: string;
    status?: string;
    tour?: {
        title?: string;
        slug?: string;
        images?: string[];
        arrivalLocation?: string;
        startDate?: string;
        startTime?: string;
        endDate?: string;
    };
    title?: string;
    slug?: string;
    arrivalLocation?: string;
    image?: string;
    payment?: {
        _id?: string;
        invoiceUrl?: string;
        transactionId?: string;
        amount?: number;
        status?: string;
    };
    batches?: TBookingBatch[];
};

type TBookingBatch = {
    _id?: string;
    batchNo?: number | string;
    batchNumber?: number | string;
    title?: string;
    startDate?: string;
    date?: string;
    startTime?: string;
    endDate?: string;
    bookingStatus?: string;
    status?: string;
    payment?: {
        _id?: string;
        invoiceUrl?: string;
        transactionId?: string;
        amount?: number;
        status?: string;
    };
};

const normalizeStatus = (status?: string) => (status ?? "").toLowerCase();

const getStatusDate = (value?: string) => {
    if (!value) {
        return null;
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    return parsed;
};

const getTimelineStatus = (booking: TBookingRecord): "Upcoming" | "Completed" => {
    const endDate = getStatusDate(booking.tour?.endDate ?? booking.endDate ?? booking.startDate ?? booking.date ?? booking.tour?.startDate);

    if (!endDate) {
        return "Upcoming";
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

    if (today > end) {
        return "Completed";
    }

    return "Upcoming";
};

const isUpcomingBooking = (booking: TBookingRecord) => {
    const status = normalizeStatus(booking.bookingStatus ?? booking.status);

    if (status.includes("cancel") || status.includes("failed")) {
        return false;
    }

    if (status.includes("upcoming")) {
        return true;
    }

    return getTimelineStatus(booking) === "Upcoming";
};

const formatCount = (count: number) => String(count).padStart(2, "0");

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

const getPaymentStatusClassName = (status?: string) => {
    const normalized = normalizeStatus(status);

    if (normalized.includes("paid") || normalized.includes("success")) {
        return "text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full";
    }

    if (normalized.includes("fail") || normalized.includes("cancel")) {
        return "text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-full";
    }

    if (normalized.includes("pending")) {
        return "text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded-full";
    }

    return "text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full";
};

const getBatchTimelineStatus = (batch: TBookingBatch, booking: TBookingRecord): "Upcoming" | "Completed" => {
    return getTimelineStatus({
        startDate: batch.startDate ?? batch.date ?? booking.startDate ?? booking.date ?? booking.tour?.startDate,
        endDate: batch.endDate ?? booking.tour?.endDate ?? booking.endDate,
        bookingStatus: batch.bookingStatus ?? batch.status,
        status: batch.status ?? batch.bookingStatus,
        tour: booking.tour,
    });
};

const getBookingBatches = (booking: TBookingRecord): TBookingBatch[] => {
    if (Array.isArray(booking.batches) && booking.batches.length > 0) {
        return booking.batches;
    }

    return [
        {
            _id: booking._id,
            title: booking.title,
            startDate: booking.startDate,
            date: booking.date,
            startTime: booking.startTime,
            endDate: booking.endDate,
            bookingStatus: booking.bookingStatus,
            status: booking.status,
            payment: booking.payment,
        },
    ];
};

const getBatchKey = (batch: TBookingBatch) => {
    return [
        batch.batchNo,
        batch.batchNumber,
        batch._id,
        batch.startDate,
        batch.endDate,
        batch.date,
    ].filter(Boolean).join("-");
};

const getBookingGroupKey = (booking: TBookingRecord) => {
    const slug = booking?.tour?.slug ?? booking?.slug;
    const title = booking?.tour?.title ?? booking?.title;
    const location = booking?.tour?.arrivalLocation ?? booking?.arrivalLocation;

    return slug || `${title ?? "tour"}-${location ?? "location"}`;
};

const formatAmount = (amount?: number) => {
    if (typeof amount !== "number") {
        return "N/A";
    }

    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount);
};

const UserDashboard = () => {
    const { data: wishlistData, isLoading: isWishlistLoading } = useGetWishlistQuery(undefined);
    const { data: bookingData, isLoading: isBookingLoading } = useGetMyBookingsQuery({ page: 1, limit: 10 });

    const wishlistItems = Array.isArray((wishlistData as { data?: unknown[] } | undefined)?.data)
        ? ((wishlistData as { data?: unknown[] }).data ?? [])
        : [];
    const bookings = Array.isArray((bookingData as { data?: unknown[] } | undefined)?.data)
        ? (((bookingData as { data?: unknown[] }).data ?? []) as TBookingRecord[])
        : [];

    const totalBookings = bookings.length;
    const upcomingTours = bookings.filter(isUpcomingBooking).length;
    const wishlistCount = wishlistItems.length;

    const recentBookings = bookings.length
        ? [...bookings]
            .sort((a, b) => {
                const aDate = new Date(a.createdAt ?? a.startDate ?? a.date ?? 0).getTime();
                const bDate = new Date(b.createdAt ?? b.startDate ?? b.date ?? 0).getTime();
                return bDate - aDate;
            })
            .reduce<TBookingRecord[]>((grouped, booking) => {
                const key = getBookingGroupKey(booking);
                const existing = grouped.find((item) => getBookingGroupKey(item) === key);
                const bookingBatches = getBookingBatches(booking);

                if (!existing) {
                    grouped.push({
                        ...booking,
                        batches: bookingBatches,
                    });
                    return grouped;
                }

                const existingBatches = existing.batches ?? [];
                const merged = [...existingBatches, ...bookingBatches];
                const uniqueMap = new Map<string, TBookingBatch>();

                // Keep only exact duplicate rows out; allow same batchNo with different invoices/payments.
                merged.forEach((batch) => {
                    const key = `${getBatchKey(batch)}-${batch.payment?._id ?? ""}-${batch.payment?.transactionId ?? ""}-${batch.payment?.invoiceUrl ?? ""}`;
                    uniqueMap.set(key, batch);
                });

                existing.batches = Array.from(uniqueMap.values());

                const existingDate = new Date(existing.createdAt ?? existing.startDate ?? existing.date ?? 0).getTime();
                const incomingDate = new Date(booking.createdAt ?? booking.startDate ?? booking.date ?? 0).getTime();

                if (incomingDate > existingDate) {
                    existing.createdAt = booking.createdAt;
                }

                return grouped;
            }, [])
            .filter((booking) => getBookingBatches(booking).some((batch) => getBatchTimelineStatus(batch, booking) === "Upcoming"))
            .slice(0, 5) // Show up to 5 recent tours
        : [];

    const getStatusClassName = (status: string) => {
        const normalized = normalizeStatus(status);
        if (normalized.includes("upcoming")) {
            return "text-xs font-medium bg-blue-500 text-white px-3 py-[3px] rounded-full";
        } else if (normalized.includes("ongoing")) {
            return "text-xs font-medium bg-amber-500 text-white px-3 py-[3px] rounded-full";
        } else {
            return "text-xs font-medium bg-green-600 text-white px-3 py-[3px] rounded-full";
        }
    };

    const getBookingDetailsUrl = (booking: TBookingRecord) => {
        const slug = booking?.tour?.slug ?? booking?.slug;
        return slug ? `/tours/${slug}` : "/tours";
    };

    return (
        <>
            <section className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                {isBookingLoading ? (
                    <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 border border-gray-200 rounded-xl p-3 md:p-5">
                        <Skeleton className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 rounded-full" />
                        <div className="flex-1">
                            <Skeleton className="h-8 w-12 mb-2" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 border border-gray-200 rounded-xl p-3 md:p-5">
                        <span className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 bg-primary-500 flex justify-center items-center rounded-full text-white text-[22px] xl:text-[25px]"><IoCalendarOutline /></span>
                        <div>
                            <p className="text-center md:text-start text-2xl font-bold text-gray-700">{formatCount(totalBookings)}</p>
                            <p className="text-center md:text-start text-base text-gray-600 font-medium">Total Bookings</p>
                        </div>
                    </div>
                )}
                {isBookingLoading ? (
                    <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 border border-gray-200 rounded-xl p-3 md:p-5">
                        <Skeleton className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 rounded-full" />
                        <div className="flex-1">
                            <Skeleton className="h-8 w-12 mb-2" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 border border-gray-200 rounded-xl p-3 md:p-5">
                        <span className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 bg-green-500 flex justify-center items-center rounded-full text-white text-[22px] xl:text-[25px]"><TbLocationPin /></span>
                        <div>
                            <p className="text-center md:text-start text-2xl font-bold text-gray-700">{formatCount(upcomingTours)}</p>
                            <p className="text-center md:text-start text-base text-gray-600 font-medium">Upcoming Tours</p>
                        </div>
                    </div>
                )}
                {isWishlistLoading ? (
                    <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 border border-gray-200 rounded-xl p-3 md:p-5">
                        <Skeleton className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 rounded-full" />
                        <div className="flex-1">
                            <Skeleton className="h-8 w-12 mb-2" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 border border-gray-200 rounded-xl p-3 md:p-5">
                        <span className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 bg-red-500 flex justify-center items-center rounded-full text-white text-[22px] xl:text-[25px]"><IoHeartHalfOutline /></span>
                        <div>
                            <p className="text-center md:text-start text-2xl font-bold text-gray-700">{formatCount(wishlistCount)}</p>
                            <p className="text-center md:text-start text-base text-gray-600 font-medium">Wishlist Items</p>
                        </div>
                    </div>
                )}
            </section>

            <section className="mt-6 border border-gray-200 rounded-xl p-3 md:p-5">
                <div className="flex justify-between gap-5 flex-wrap">
                    <h2 className="text-xl font-bold text-primary-950">Recent Bookings</h2>
                    <p><Link to="/user/my-bookings" className="tp-action-btn !h-9 !py-2 inline-flex gap-2 items-center">View All <span><LuFolderOpen size={16} /></span></Link></p>
                </div>

                {isBookingLoading ? (
                    <div className="border flex flex-col sm:flex-row sm:items-center gap-3 border-gray-200 rounded-xl p-3 md:p-4 mt-5">
                        <Skeleton className="rounded-xl h-[220px] sm:h-[130px] w-full sm:max-w-48" />
                        <div className="flex-1">
                            <Skeleton className="h-8 w-48 mb-4" />
                            <Skeleton className="h-4 w-64 mb-2" />
                            <Skeleton className="h-4 w-48 mb-6" />
                            <div className="flex gap-2">
                                <Skeleton className="h-10 w-28" />
                                <Skeleton className="h-10 w-20" />
                            </div>
                        </div>
                    </div>
                ) : recentBookings.length > 0 ? (
                    <div className="space-y-4 mt-5">
                        {recentBookings.map((booking, bookingIndex) => {
                            const bookingStatus = getTimelineStatus(booking);
                            const detailsUrl = getBookingDetailsUrl(booking);
                            const batchItems = getBookingBatches(booking);

                            return (
                                <div key={`${booking._id ?? detailsUrl}-${bookingIndex}`} className="border border-gray-200 rounded-xl p-3 md:p-4 bg-white">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                        <img className="rounded-xl h-[220px] sm:h-[130px] object-cover w-full sm:max-w-48" src={booking?.tour?.images?.[0] ?? booking?.image ?? ImageWaterMark} alt="Tour Image" />
                                        <div>
                                            <h2 className='mt-1 mb-2 flex flex-wrap items-center gap-2'>
                                                <Link to={detailsUrl} className='text-gray-800 hover:text-primary-500 text-xl font-bold cursor-pointer duration-300'>{booking?.tour?.title ?? booking?.title ?? "Tour name"}</Link>
                                                <span className={getStatusClassName(bookingStatus)}>{bookingStatus}</span>
                                                <span className="text-xs font-medium bg-primary-100 text-primary-700 px-3 py-[3px] rounded-full">{batchItems.length} Batch{batchItems.length > 1 ? "es" : ""}</span>
                                            </h2>
                                            <p className='text-sm text-gray-500 font-medium inline-flex gap-1 pr-3'><span><FaLocationDot size={14} className="mt-1" /></span> {booking?.tour?.arrivalLocation ?? booking?.arrivalLocation ?? "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                                            {batchItems.map((batch, batchIndex) => {
                                                const batchStatus = getBatchTimelineStatus(batch, booking);
                                                const batchNoFromApi = batch.batchNo ?? batch.batchNumber;
                                                const batchNo = (() => {
                                                    if (batchNoFromApi !== undefined && batchNoFromApi !== null && `${batchNoFromApi}`.trim() !== "") {
                                                        return String(batchNoFromApi);
                                                    }

                                                    const uniqueBatchKeys = Array.from(new Set(batchItems.map((item) => getBatchKey(item) || `idx-${batchItems.indexOf(item)}`)));
                                                    const currentKey = getBatchKey(batch) || `idx-${batchIndex}`;
                                                    return String(uniqueBatchKeys.indexOf(currentKey) + 1);
                                                })();
                                                const batchStartDate = formatBookingDate(
                                                    batch.startDate ?? batch.date ?? booking.startDate ?? booking.date ?? booking.tour?.startDate
                                                );
                                                const invoiceUrl = batch.payment?.invoiceUrl ?? booking.payment?.invoiceUrl;
                                                const paymentStatus = batch.payment?.status ?? booking.payment?.status ?? "Unpaid";
                                                const paymentStatusClass = getPaymentStatusClassName(paymentStatus);
                                                const amount = batch.payment?.amount ?? booking.payment?.amount;

                                                return (
                                                    <div key={`${batch._id ?? booking._id ?? "batch"}-${batchIndex}`} className="rounded-lg border border-gray-200 bg-gray-50/70 p-3">
                                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                                            <p className="text-sm font-semibold text-gray-700">Batch #{batchNo}</p>
                                                            <span className={getStatusClassName(batchStatus)}>{batchStatus}</span>
                                                        </div>

                                                        <p className='mt-2 text-sm text-gray-600 font-medium inline-flex gap-1'><span><LuTimer size={16} className='mt-[2px]' /></span> Start: {batchStartDate}</p>

                                                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                                                            <span className={paymentStatusClass}>{paymentStatus}</span>
                                                            <span className="text-xs font-semibold bg-white text-gray-700 px-2 py-1 rounded-full border border-gray-200">
                                                                {formatAmount(amount)}
                                                            </span>
                                                        </div>

                                                        <div className="mt-3 flex gap-2 flex-wrap">
                                                            {invoiceUrl && (
                                                                <a href={invoiceUrl} target="_blank" rel="noreferrer" className='text-[13px] text-center font-semibold bg-red-500 hover:bg-red-700 text-white hover:text-white px-3 pt-[5px] pb-[7px] rounded-full transition-all duration-300 inline-flex items-center gap-2'>Invoice <span><FaRegFilePdf size={14} /></span></a>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <h2 className='mt-3 mb-5 text-center text-gray-500 text-lg font-semibold'>No booking found</h2>
                )}
            </section>

            <section className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-3 md:p-5">
                    <h2 className="text-xl font-bold text-primary-950">Quick Actions</h2>

                    <div className="grid sm:grid-cols-2 gap-3 mt-5">
                        <Link to='/tours' className="py-4 lg:py-5 pr-4 xl:pr-5 pl-5 xl:pl-6 h-28 bg-green-500 hover:bg-green-600 duration-300 text-center rounded-xl font-semibold text-white text-base flex justify-center items-center gap-2"><span><TbLocationPin size={18} /></span> Book New Tour</Link>
                        <Link to='/destinations' className="py-4 lg:py-5 pr-4 xl:pr-5 pl-5 xl:pl-6 h-28 bg-primary-500 hover:bg-primary-600 duration-300 text-center rounded-xl font-semibold text-white text-base flex justify-center items-center gap-2"><span><LuTentTree size={18} /></span> Destinations</Link>
                        <Link to='/tour-guide' className="py-4 lg:py-5 pr-4 xl:pr-5 pl-5 xl:pl-6 h-28 bg-purple-500 hover:bg-purple-600 duration-300 text-center rounded-xl font-semibold text-white text-base flex justify-center items-center gap-2"><span><TbMapPin2 size={18} /></span> Tour Guides</Link>
                        <Link to='/contact-us' className="py-4 lg:py-5 pr-4 xl:pr-5 pl-5 xl:pl-6 h-28 bg-red-500 hover:bg-red-600 duration-300 text-center rounded-xl font-semibold text-white text-base flex justify-center items-center gap-2"><span><BiSupport size={18} /></span> Support</Link>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-xl">
                    <div className="flex justify-between gap-5 flex-wrap p-3 md:p-5">
                        <h2 className="text-xl font-bold text-primary-950">Notifications</h2>
                        <p><Link to="/user/my-bookings" className="tp-action-btn !h-9 !py-2 inline-flex gap-2 items-center">View All <span><LuFolderOpen size={16} /></span></Link></p>
                    </div>

                    <ul>
                        <li className="flex gap-2 px-4 py-5 border-t border-gray-200">
                            <span className="text-[22px] text-gray-500 bg-gray-300 w-12 min-w-12 h-12 rounded-full inline-flex justify-center items-center"><IoNotificationsOutline /></span>
                            <div>
                                <p className="text-base text-gray-700 font-semibold">Booking Confirmation</p>
                                <p className="text-sm">Thank you for choosing Air. Your adventure is set.</p>
                            </div>
                        </li>
                        <li className="flex gap-2 px-4 py-4 bg-primary-50 border-t border-gray-200 cursor-pointer">
                            <span className="text-[22px] text-primary-400 bg-primary-100 w-12 min-w-12 h-12 rounded-full inline-flex justify-center items-center"><IoNotificationsOutline /></span>
                            <div className="flex-1">
                                <p className="text-base font-semibold text-primary-700">Rescheduling Notification</p>
                                <p className="text-sm text-primary-700">Thank you for choosing Air. Your adventure is set.</p>
                            </div>
                            <span className="bg-primary-400 hover:bg-primary-600 cursor-pointer duration-300 w-3 h-3 rounded-full"></span>
                        </li>
                        <li className="flex gap-2 px-4 py-4 bg-primary-50 border-t border-gray-200 cursor-pointer">
                            <span className="text-[22px] text-primary-400 bg-primary-100 w-12 min-w-12 h-12 rounded-full inline-flex justify-center items-center"><IoNotificationsOutline /></span>
                            <div className="flex-1">
                                <p className="text-base font-semibold text-primary-700">Rescheduling Notification</p>
                                <p className="text-sm text-primary-700">Thank you for choosing Air. Your adventure is set.</p>
                            </div>
                            <span className="bg-primary-400 hover:bg-primary-600 cursor-pointer duration-300 w-3 h-3 rounded-full"></span>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default UserDashboard;