import { Skeleton } from '@/components/ui/skeleton';

const TourCardLoader = () => {
    return (
        <div className="rounded-[10px] border border-gray-200 bg-white">
            <Skeleton className="h-[170px] rounded-b-0" />
            <div className="p-5">
                <Skeleton className="h-4 rounded-full max-w-[100px]" />
                <Skeleton className="h-4 rounded-full max-w-[140px] mt-2" />
                <Skeleton className="h-5 rounded-full max-w-[250px] mt-5" />
                <Skeleton className="h-5 rounded-full max-w-[200px] mt-2" />
            </div>
        </div>
    );
};

export default TourCardLoader;