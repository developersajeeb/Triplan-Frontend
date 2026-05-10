import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Clock3, ExternalLink, Mail, MailOpen, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import PaginationComponent from '@/components/ui/PaginationComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetAdminEnquiriesQuery, useUpdateAdminEnquiryMutation } from '@/redux/features/enquiry/enquiry.api';
import type { IAdminEnquiry } from '@/types';

type EnquiryApiResponse = {
    data?: IAdminEnquiry[];
    meta?: {
        page?: number;
        total?: number;
        totalPages?: number;
    };
};

const normalizeStatus = (status?: string) => (status ?? '').toLowerCase();

const getBadgeClassName = (status?: string) => {
    const normalized = normalizeStatus(status);

    if (normalized === 'unread') {
        return 'bg-blue-100 text-blue-700';
    }

    if (normalized === 'replied') {
        return 'bg-green-100 text-green-700';
    }

    return 'bg-slate-100 text-slate-700';
};

const TableFilter = ({
    onChange,
    initialSearch = '',
    initialStatus = 'all',
    initialSort = 'newest',
}: {
    onChange: (filters: { search: string; status: string; sort: string }) => void;
    initialSearch?: string;
    initialStatus?: string;
    initialSort?: string;
}) => {
    const [query, setQuery] = useState(initialSearch);
    const [status, setStatus] = useState(initialStatus);
    const [sort, setSort] = useState(initialSort);

    useEffect(() => setQuery(initialSearch), [initialSearch]);
    useEffect(() => setStatus(initialStatus), [initialStatus]);
    useEffect(() => setSort(initialSort), [initialSort]);

    const handleSubmit = (event?: React.FormEvent) => {
        event?.preventDefault();
        onChange({ search: query, status, sort });
    };

    const handleReset = () => {
        setQuery('');
        setStatus('all');
        setSort('newest');
        onChange({ search: '', status: 'all', sort: 'newest' });
    };

    return (
        <section className="flex flex-wrap justify-between gap-5 p-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <div className="relative w-full min-w-[250px]">
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            type="text"
                            className="tp-input w-full !pr-12"
                            placeholder="Search by name or email..."
                        />
                        <Button type="submit" size="icon" className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1">
                            <Search className="h-[18px] w-[18px]" />
                        </Button>
                    </div>
                </form>

                {(query.trim() !== '' || status !== 'all' || sort !== 'newest') && (
                    <button
                        onClick={handleReset}
                        type="button"
                        className="flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg"
                    >
                        Reset
                    </button>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <Select
                    value={status}
                    onValueChange={(value) => {
                        const nextStatus = value || 'all';
                        setStatus(nextStatus);
                        onChange({ search: query, status: nextStatus, sort });
                    }}
                >
                    <SelectTrigger className="w-[180px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
                        <SelectValue placeholder="All status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={sort}
                    onValueChange={(value) => {
                        const nextSort = value || 'newest';
                        setSort(nextSort);
                        onChange({ search: query, status, sort: nextSort });
                    }}
                >
                    <SelectTrigger className="w-[170px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </section>
    );
};

const Enquiries = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const sort = searchParams.get('sort') || 'newest';

    const { data, isLoading, isFetching } = useGetAdminEnquiriesQuery({
        page,
        limit: 10,
        ...(search ? { search } : {}),
        ...(status ? { status } : {}),
        ...(sort ? { sort } : {}),
    }) as { data?: EnquiryApiResponse; isLoading: boolean; isFetching: boolean };

    const [updateAdminEnquiry, { isLoading: isUpdating }] = useUpdateAdminEnquiryMutation();
    const [selectedId, setSelectedId] = useState<string>('');
    const [replyDraft, setReplyDraft] = useState('');

    const enquiries = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data?.data]);
    // Only use selectedId to find the selected enquiry — do NOT auto-select the first item.
    const selectedEnquiry = selectedId ? enquiries.find((item) => item._id === selectedId) || null : null;

    // Do not auto-select any enquiry on load — selection happens when admin clicks an item.

    useEffect(() => {
        if (selectedEnquiry) {
            setReplyDraft(selectedEnquiry.replyMessage || '');

            if (normalizeStatus(selectedEnquiry.status) === 'unread') {
                void updateAdminEnquiry({
                    enquiryId: selectedEnquiry._id,
                    payload: { status: 'READ' },
                });
            }
        }
    }, [selectedEnquiry, updateAdminEnquiry]);

    const unreadCount = enquiries.filter((item) => normalizeStatus(item.status) === 'unread').length;

    const handleFiltersChange = (filters: { search: string; status: string; sort: string }) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (filters.search?.trim()) {
            params.set('search', filters.search.trim());
        } else {
            params.delete('search');
        }

        if (filters.status && filters.status !== 'all') {
            params.set('status', filters.status);
        } else {
            params.delete('status');
        }

        if (filters.sort && filters.sort !== 'newest') {
            params.set('sort', filters.sort);
        } else {
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

    const handleSendReply = async () => {
        if (!selectedEnquiry) {
            return;
        }

        if (!replyDraft.trim()) {
            toast.error('Reply message is required.');
            return;
        }

        try {
            await updateAdminEnquiry({
                enquiryId: selectedEnquiry._id,
                payload: {
                    status: 'REPLIED',
                    replyMessage: replyDraft.trim(),
                },
            }).unwrap();

            toast.success('Reply sent successfully.');
        } catch (error: unknown) {
            const message = (error as { data?: { message?: string } })?.data?.message || 'Failed to send reply.';
            toast.error(message);
        }
    };

    const totalEnquiries = Number(data?.meta?.total ?? 0);
    const currentPage = Number(data?.meta?.page ?? page);
    const totalPages = Math.max(1, Number(data?.meta?.totalPages ?? Math.ceil(totalEnquiries / 10)));

    return (
        <>
            <h2 className="text-2xl font-bold">Enquiries</h2>
            <p className="text-base font-medium text-gray-600 mb-5">
                Manage incoming tour enquiries in a simple inbox layout.
            </p>

            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                <TableFilter onChange={handleFiltersChange} initialSearch={search} initialStatus={status} initialSort={sort} />

                <div className="grid gap-0 xl:[grid-template-columns:30%_70%]">
                    <div className="border-r border-slate-200">
                        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/70">
                            <p className="text-sm font-semibold text-slate-900">Inbox</p>
                            <p className="text-xs text-slate-500">{totalEnquiries} total • {unreadCount} unread</p>
                        </div>

                        <div className="max-h-[72vh] overflow-y-auto">
                            {isLoading || isFetching ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="border-b border-slate-100 p-5 space-y-2">
                                        <Skeleton className="h-5 w-40" />
                                        <Skeleton className="h-4 w-64" />
                                        <Skeleton className="h-4 w-52" />
                                    </div>
                                ))
                            ) : enquiries.length > 0 ? (
                                enquiries.map((enquiry) => {
                                    const isSelected = enquiry._id === selectedEnquiry?._id;
                                    const isUnread = normalizeStatus(enquiry.status) === 'unread';

                                    return (
                                        <button
                                            key={enquiry._id}
                                            type="button"
                                            onClick={() => setSelectedId(enquiry._id)}
                                            className={`w-full text-left border-b border-slate-100 px-5 py-4 transition-colors duration-300 ${isSelected ? 'bg-primary-50' : 'hover:bg-slate-50'}`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        {isUnread ? <Mail className="h-4 w-4 text-primary-500 flex-shrink-0" /> : <MailOpen className="h-4 w-4 text-slate-400 flex-shrink-0" />}
                                                        <p className="font-semibold text-slate-900 truncate">{enquiry.name}</p>
                                                    </div>
                                                    <p className="text-sm text-slate-500 truncate">{enquiry.email}</p>
                                                </div>
                                                <span className={`shrink-0 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getBadgeClassName(enquiry.status)}`}>
                                                    {enquiry.status}
                                                </span>
                                            </div>

                                            <span className="inline-flex items-center gap-1 truncate text-xs text-slate-600 mt-2">
                                                <Clock3 size={12} />
                                                {format(new Date(enquiry.createdAt), 'dd MMM, yyyy')}
                                            </span>
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="p-10 text-center text-gray-500">No enquiries found.</div>
                            )}
                        </div>

                        {totalEnquiries > 10 ? (
                            <div className="border-t border-slate-200 px-5 py-4 flex justify-center bg-white">
                                <PaginationComponent
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    paginationItemsToDisplay={2}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        ) : null}
                    </div>

                    <div className="bg-slate-50/70 p-5 xl:p-6">
                        {selectedEnquiry ? (
                            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 xl:p-6">
                                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                                    <div className="min-w-0">
                                        <p className="text-lg font-semibold text-slate-900 truncate">{selectedEnquiry.name}</p>
                                        <p className="text-sm text-slate-500 truncate">{selectedEnquiry.email}</p>
                                        {selectedEnquiry.phone ? (
                                            <p className="text-xs text-slate-400 mt-1 truncate">{selectedEnquiry.phone}</p>
                                        ) : null}
                                    </div>
                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClassName(selectedEnquiry.status)}`}>
                                        {selectedEnquiry.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-slate-600">
                                    {selectedEnquiry.tourSlug ? (
                                        <Link to={`/tours/${selectedEnquiry.tourSlug}`} className="inline-flex items-center gap-1 text-primary-600 font-medium hover:underline truncate">
                                            <ExternalLink size={12} />
                                            <span className="truncate">{selectedEnquiry.tourTitle || 'View tour'}</span>
                                        </Link>
                                    ) : (
                                        <span className="text-slate-500">General enquiry</span>
                                    )}
                                    <span className="text-xs text-slate-400">• {format(new Date(selectedEnquiry.createdAt), 'dd MMM, yyyy')}</span>
                                </div>

                                <div className="flex flex-col gap-3 mt-5 overflow-auto flex-1 max-h-[48vh] p-2">
                                    <div className="flex">
                                        <div className="bg-slate-100 text-slate-900 rounded-xl p-3 max-w-[80%] whitespace-pre-wrap">
                                            {selectedEnquiry.message}
                                        </div>
                                    </div>

                                    {selectedEnquiry.replyMessage ? (
                                        selectedEnquiry.replyMessage.split(/\r?\n+/).map((part: string, idx: number) => (
                                            <div key={idx} className="flex justify-end">
                                                <div className="bg-primary-600 text-white rounded-xl p-3 max-w-[80%] whitespace-pre-wrap">
                                                    {part}
                                                </div>
                                            </div>
                                        ))
                                    ) : null}
                                </div>

                                <div className="sticky bottom-0 bg-white pt-4">
                                    <div>
                                        <Textarea
                                            value={replyDraft}
                                            onChange={(event) => setReplyDraft(event.target.value)}
                                            className="min-h-[120px] border border-slate-200 rounded-md"
                                            placeholder="Write your reply here..."
                                        />

                                        <div className="mt-3 flex items-center justify-end">
                                            <Button
                                                type="button"
                                                disabled={isUpdating}
                                                onClick={handleSendReply}
                                                className="tp-primary-btn h-10 px-4 inline-flex items-center gap-2"
                                            >
                                                {isUpdating ? 'Sending...' : 'Send'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center min-h-[60vh]">
                                <div className="text-center text-slate-500">
                                    <div className="mx-auto mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-700">
                                        <Mail size={24} />
                                    </div>
                                    <h3 className="text-lg font-semibold">No enquiry selected</h3>
                                    <p className="mt-2 text-sm">Click an item on the left to view details and reply.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Enquiries;