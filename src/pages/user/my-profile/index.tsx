import NotUserIcon from "@/components/shared/blocks/NotUserIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router";


const MyProfile = () => {
    const { data: userData, isLoading } = useUserInfoQuery(undefined);

    return (
        <>
            <h2 className="text-xl font-bold text-primary-950 mb-4">My Profile <Link to='/user/settings' className="w-8 h-8 text-primary-500 hover:text-white rounded-full bg-primary-100 hover:bg-primary-500 duration-300 inline-flex justify-center items-center ml-2"><TbEdit size={18} /></Link></h2>
            <div className="p-5 border border-gray-300 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
                {isLoading ? (
                    <Skeleton className="w-40 h-5 mt-1" />
                ) : userData?.data?.picture ? (
                    <img className="w-24 h-[88px] rounded-xl my-5 object-cover bg-gray-100" src={userData?.data?.picture} alt="User profile photo" />
                ) : (
                    <NotUserIcon className="rounded-xl my-5 min-w-24 h-[88px]" iconSize={46} />
                )}

                <div className="flex flex-wrap gap-5 lg:gap-8">
                    <div>
                        <p className="font-bold text-gray-500 text-sm">Name</p>
                        <p className="font-medium text-gray-800 text-base">{isLoading ? <Skeleton className="w-40 h-5 mt-1" /> : userData?.data?.name ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-500 text-sm">Email</p>
                        <p className="font-medium text-gray-800 text-base break-all">{isLoading ? <Skeleton className="w-40 h-5 mt-1" /> : userData?.data?.email ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-500 text-sm">Phone</p>
                        <p className="font-medium text-gray-800 text-base">{isLoading ? <Skeleton className="w-40 h-5 mt-1" /> : userData?.data?.phone ?? 'N/A'}</p>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-gray-300 my-5"></div>

                <h3 className="text-lg font-semibold text-gray-700">Address Information</h3>
                <div className="flex flex-wrap gap-5 lg:gap-8 mt-4">
                    <div>
                        <p className="font-bold text-gray-500 text-sm">Address</p>
                        <p className="font-medium text-gray-800 text-base">{isLoading ? <Skeleton className="w-40 h-5 mt-1" /> : userData?.data?.address ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-500 text-sm">Country</p>
                        <p className="font-medium text-gray-800 text-base break-all">{isLoading ? <Skeleton className="w-40 h-5 mt-1" /> : userData?.data?.country ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-500 text-sm">City</p>
                        <p className="font-medium text-gray-800 text-base">{isLoading ? <Skeleton className="w-40 h-5 mt-1" /> : userData?.data?.city ?? 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-500 text-sm">Postal Code</p>
                        <p className="font-medium text-gray-800 text-base">{isLoading ? <Skeleton className="w-40 h-5 mt-1" /> : userData?.data?.post_code ?? 'N/A'}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;