import { AddDestinationModal } from './AddDestinationModal';

const Division = () => {
    return (
        <>
            <div className="flex justify-between gap-4 mb-6">
                <h1 className="text-2xl font-semibold">Division</h1>
                <AddDestinationModal />
            </div>
        </>
    );
};

export default Division;