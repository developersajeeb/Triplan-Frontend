import { DataTable } from "./DataTable";
import TableFilter from "./TableFilter";


const Payments = () => {
    return (
        <>
            <h2 className="text-xl font-bold text-primary-950 mb-4">Payments</h2>
            <div className="border border-gray-200 rounded-xl pb-6">
                <TableFilter />
                <DataTable />
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

export default Payments;