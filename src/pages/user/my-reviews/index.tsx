import { Link } from "react-router";


const MyReviews = () => {
    return (
        <>
            <h2 className="text-xl font-bold text-primary-950 mb-4">My Reviews</h2>

            <section>
                <div className="border border-gray-200 rounded-xl p-5">
                    <p className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2"><span className="w-[6px] h-[6px] bg-gray-500 rounded-full inline-block"></span> 8 April 2026</p>
                    <p className="text-base font-medium text-gray-600">It was a good location however the cocoon concept was weird. No tables, chairs etc was difficult as everything went on the floor.</p>
                    <div className="mt-4 pt-5 border-t flex flex-col sm:flex-row justify-between gap-3">
                        <p className="text-sm font-medium text-gray-700">Tour: <Link to={'tour/slug'} className="font-semibold text-primary-400">Saint Martin’s Blue Ocean Escape</Link></p>
                        <div><button type="button" className="text-xs font-medium text-gray-700 border border-gray-300 hover:border-red-600 hover:bg-red-600 hover:text-white cursor-pointer duration-300 inline-flex gap-1 items-center px-3 py-[3px] rounded-full">Delete</button></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyReviews;