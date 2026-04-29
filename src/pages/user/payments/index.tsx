import { DataTable } from "./DataTable";
import TableFilter from "./TableFilter";
import { useSearchParams } from "react-router";
import { useGetMyPaymentsQuery } from "@/redux/features/payment/payment.api";
import PaginationComponent from "@/components/ui/PaginationComponent";


const Payments = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    const { data } = useGetMyPaymentsQuery({
        page,
        limit: 10,
        search,
        status,
        startDate,
        endDate,
    });

    const meta = data?.meta || {};

    const handlePageChange = (pageNum: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(pageNum));
        setSearchParams(params);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <h2 className="text-xl font-bold text-primary-950 mb-4">Payments</h2>
            <div className="border border-gray-200 rounded-xl pb-6">
                <TableFilter />
                <DataTable />
                {meta.totalPages > 1 ? (
                    <div className="mt-8 flex justify-center">
                        <PaginationComponent
                            currentPage={meta.page || 1}
                            totalPages={meta.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                ) : null}
            </div>
        </>
    );
};

export default Payments;