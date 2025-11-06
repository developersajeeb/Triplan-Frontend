import { AddDivisionModal } from './AddDivisionModal';

const Division = () => {
    return (
        <>
            <div className="flex justify-between gap-4 mb-6">
                <h1 className="text-2xl font-semibold">Division</h1>
                <AddDivisionModal />
            </div>
        </>
    );
};

export default Division;