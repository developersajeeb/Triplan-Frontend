import { Skeleton } from '@/components/ui/skeleton';

const TourListTypeLoader = () => {
    return (
        <div className="rounded-[10px] border border-gray-200 bg-white flex flex-col sm:flex-row">
            <Skeleton className="w-full rounded-r-none h-[200px] sm:h-auto sm:max-w-[300px] sm:min-w-[300px]" />
            <div className="p-5 w-full h-full">
                <Skeleton className="h-4 rounded-full w-full max-w-[100px]" />
                <Skeleton className="h-4 rounded-full w-full max-w-[140px] mt-2" />
                <Skeleton className="h-5 rounded-full w-full max-w-[250px] mt-5" />
                <Skeleton className="h-5 rounded-full w-full max-w-[200px] mt-2" />
            </div>
        </div>
    );
};

export default TourListTypeLoader;