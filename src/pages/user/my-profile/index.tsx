import NotUserIcon from "@/components/shared/blocks/NotUserIcon";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router";


const MyProfile = () => {
    return (
        <>
            <h2 className="text-xl font-bold text-primary-950 mb-4">My Profile <Link to='/user/settings' className="w-8 h-8 text-primary-500 hover:text-white rounded-full bg-primary-100 hover:bg-primary-500 duration-300 inline-flex justify-center items-center ml-2"><TbEdit size={18} /></Link></h2>
            <div className="p-5 border border-gray-300 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>

                <NotUserIcon className="rounded-xl my-5" />

                <div className="grid grid-cols-3 gap-5">
                    <div>
                        <p className="font-bold text-gray-600 text-sm">Name</p>
                        <p className="font-medium text-gray-800 text-base">Sajeeb Debnath</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-600 text-sm">Name</p>
                        <p className="font-medium text-gray-800 text-base">Sajeeb Debnath</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-600 text-sm">Name</p>
                        <p className="font-medium text-gray-800 text-base">Sajeeb Debnath</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;