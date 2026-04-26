import { DataTable } from "./DataTable";
import TableFilter from "./TableFilter";
import { useGetMyBookingsQuery } from "@/redux/features/booking/booking.api";
import { useSearchParams } from "react-router";


const MyBookings = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const { data: bookingData, isLoading, isFetching } = useGetMyBookingsQuery({
        page: 1,
        limit: 1000,
        ...(search ? { search } : {}),
        ...(status ? { status } : {}),
    });
    const bookings = Array.isArray((bookingData as { data?: unknown[] } | undefined)?.data)
        ? ((bookingData as { data?: unknown[] })?.data ?? [])
        : [];

    return (
        <>
            <h2 className="text-xl font-bold text-primary-950 mb-4">All Bookings</h2>
            <div className="border border-gray-200 rounded-xl pb-6">
                <TableFilter />
                <DataTable bookings={bookings} isLoading={isLoading || isFetching} />
                {/* <div className='mt-8'>
                <PaginationComponent
                    currentPage={1}
                    totalPages={1}
                    onPageChange={(page) => setSearchParams({ page: String(page) })}
                />
            </div> */}
            </div>
        </>
    );
};

export default MyBookings;