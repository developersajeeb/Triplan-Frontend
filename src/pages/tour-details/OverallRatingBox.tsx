import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";

const OverallRatingBox = () => {
    const [progress, setProgress] = useState<number>(13);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="border border-gray-100 rounded-xl flex flex-col md:flex-row">
            <div className="md:w-[180px] p-5 border-b md:border-r border-gray-100">
                <h6 className="text-xl font-semibold text-gray-800 mb-2">
                    Overall rating
                </h6>
                <p className="tracking-tighter flex items-center">
                    <span className="text-primary-500 text-3xl font-semibold inline-flex items-center gap-1">
                        <TiStarFullOutline size={28} /> 5.0
                    </span>
                    <span className="font-semibold text-lg text-gray-800 -mb-1">
                        /5
                    </span>
                </p>
                <p className="mt-1 text-gray-700">(1 review)</p>
            </div>
            <div className="p-5 flex-1">
                <p className="text-lg font-semibold mb-4">Review summary</p>
                <div className="grid sm:grid-cols-2 gap-x-5 md:gap-x-14 gap-y-3 sm:gap-y-5">
                    <div>
                        <p className="flex justify-between gap-2 text-gray-600 text-sm font-medium mb-1">
                            <span>Guide</span> <span>5.0/5</span>
                        </p>
                        <Progress
                            value={progress}
                            className="w-full bg-primary-500"
                        />
                    </div>
                    <div>
                        <p className="flex justify-between gap-2 text-gray-600 text-sm font-medium mb-1">
                            <span>Service</span> <span>5.0/5</span>
                        </p>
                        <Progress
                            value={progress}
                            className="w-full bg-primary-500"
                        />
                    </div>
                    <div>
                        <p className="flex justify-between gap-2 text-gray-600 text-sm font-medium mb-1">
                            <span>Transportation</span> <span>5.0/5</span>
                        </p>
                        <Progress
                            value={progress}
                            className="w-full bg-primary-500"
                        />
                    </div>
                    <div>
                        <p className="flex justify-between gap-2 text-gray-600 text-sm font-medium mb-1">
                            <span>Organization</span> <span>5.0/5</span>
                        </p>
                        <Progress
                            value={progress}
                            className="w-full bg-primary-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverallRatingBox;