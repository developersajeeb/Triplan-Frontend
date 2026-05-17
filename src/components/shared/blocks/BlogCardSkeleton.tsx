const BlogCardSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="h-[250px] bg-gray-200 rounded-2xl" />
            <div className="flex gap-3 mt-3">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-7 bg-gray-200 rounded mt-3 mb-2" />
            <div className="h-7 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="space-y-2 mb-5">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded-full" />
        </div>
    );
};

export default BlogCardSkeleton;
