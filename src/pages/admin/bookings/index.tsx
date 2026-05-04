import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import TableFilter from './TableFilter';
import BookingsDataTable from './BookingsDataTable';
import PaginationComponent from '@/components/ui/PaginationComponent';
import { useGetAdminBookingsQuery } from '@/redux/features/booking/booking.api';
import type { IBookingRecord, IBookingBatch } from '@/types';

type BookingApiResponse = {
  data?: unknown[];
  meta?: {
    page?: number;
    total?: number;
    totalPages?: number;
  };
};

const formatGuests = (batch: IBookingBatch, booking: IBookingRecord) => {
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

  if (typeof travelerCount === 'number' && Number.isFinite(travelerCount) && travelerCount > 0) {
    return `${travelerCount} Guest${travelerCount > 1 ? 's' : ''}`;
  }

  const adults = batch.adults ?? batch.adult ?? booking.adults ?? booking.adult;
  const children = batch.children ?? batch.child ?? booking.children ?? booking.child;
  const parts = [
    typeof adults === 'number' && adults > 0 ? `${adults} Adult${adults > 1 ? 's' : ''}` : null,
    typeof children === 'number' && children > 0 ? `${children} Child${children > 1 ? 'ren' : ''}` : null,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(', ') : 'N/A';
};

const getBatches = (booking: IBookingRecord): IBookingBatch[] => {
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

const getCustomerName = (booking: IBookingRecord & { user?: { name?: string; fullName?: string; firstName?: string; lastName?: string; email?: string } }) => {
  const user = booking.user;

  if (!user) {
    return 'N/A';
  }

  if (typeof user.name === 'string' && user.name.trim()) {
    return user.name;
  }

  if (typeof user.fullName === 'string' && user.fullName.trim()) {
    return user.fullName;
  }

  const firstName = typeof user.firstName === 'string' ? user.firstName.trim() : '';
  const lastName = typeof user.lastName === 'string' ? user.lastName.trim() : '';

  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }

  return user.email || 'N/A';
};

const getCustomerContact = (
  booking: IBookingRecord & { user?: { email?: string; phone?: string; name?: string; fullName?: string; firstName?: string; lastName?: string } }
) => {
  const user = booking.user;

  return {
    email: user?.email || 'N/A',
    phone: user?.phone || 'N/A',
  };
};

const AdminBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page') || '1');
  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || 'all';
  const paymentStatus = searchParams.get('paymentStatus') || 'all';
  const sort = searchParams.get('sort') || 'newest';

  const { data, isLoading, isFetching } = useGetAdminBookingsQuery({
    page,
    limit: 10,
    ...(search ? { search } : {}),
    ...(status ? { status } : {}),
    ...(paymentStatus ? { paymentStatus } : {}),
    ...(sort ? { sort } : {}),
  }) as { data?: BookingApiResponse; isLoading: boolean; isFetching: boolean };

  const rows = useMemo(() => {
    const bookings = Array.isArray(data?.data) ? data.data : [];

    return bookings
      .filter((booking): booking is IBookingRecord & { user?: { name?: string; fullName?: string; firstName?: string; lastName?: string; email?: string } } => Boolean(booking && typeof booking === 'object'))
      .flatMap((booking) =>
        getBatches(booking).map((batch, index) => {
          const title = batch.title ?? booking.tour?.title ?? booking.title ?? 'Tour details';
          const slug = booking.tour?.slug ?? booking.slug;
          const customerContact = getCustomerContact(booking);

          return {
            id: `${booking._id || 'booking'}-${batch._id || index}`,
            customer: getCustomerName(booking),
            email: customerContact.email,
            phone: customerContact.phone,
            title,
            detailsUrl: slug ? `/tours/${slug}` : '/tours',
            guests: formatGuests(batch, booking),
            date: batch.startDate ?? batch.date ?? booking.startDate ?? booking.date ?? booking.createdAt ?? '',
            amount: Number(batch.payment?.amount ?? booking.payment?.amount ?? 0),
            status: batch.bookingStatus ?? batch.status ?? booking.bookingStatus ?? booking.status ?? 'Unknown',
            paymentStatus: String(batch.payment?.status ?? booking.payment?.status ?? 'Unknown'),
            invoiceUrl: batch.payment?.invoiceUrl ?? booking.payment?.invoiceUrl,
          };
        })
      );
  }, [data?.data]);

  const handleFiltersChange = (filters: { search: string; status: string; paymentStatus: string; sort: string }) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (filters.search?.trim()) {
      params.set('search', filters.search.trim());
    }
    else {
      params.delete('search');
    }

    if (filters.status && filters.status !== 'all') {
      params.set('status', filters.status);
    }
    else {
      params.delete('status');
    }

    if (filters.paymentStatus && filters.paymentStatus !== 'all') {
      params.set('paymentStatus', filters.paymentStatus);
    }
    else {
      params.delete('paymentStatus');
    }

    if (filters.sort && filters.sort !== 'newest') {
      params.set('sort', filters.sort);
    }
    else {
      params.delete('sort');
    }

    setSearchParams(params);
  };

  const handlePageChange = (pageNum: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(pageNum));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalBookings = Number(data?.meta?.total ?? 0);
  const totalPages = Math.ceil(totalBookings / 10);

  return (
    <>
      <h2 className="text-2xl font-bold">All Bookings</h2>
      <p className="text-base font-medium text-gray-600 mb-5">
        Manage all booking records from one place.
      </p>

      <div className="border border-gray-200 rounded-xl pb-6 bg-white">
        <TableFilter
          onChange={handleFiltersChange}
          initialSearch={search}
          initialStatus={status}
          initialPaymentStatus={paymentStatus}
          initialSort={sort}
        />

        <BookingsDataTable data={rows} isLoading={isLoading || isFetching} />

        {totalBookings > 10 ? (
          <div className="mt-8 flex justify-center">
            <PaginationComponent
              currentPage={Number(data?.meta?.page ?? page)}
              totalPages={totalPages}
              paginationItemsToDisplay={2}
              onPageChange={handlePageChange}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AdminBookings;
