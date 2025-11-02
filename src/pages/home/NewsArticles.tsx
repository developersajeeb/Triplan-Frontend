import WhiteSvgIcon from "@/components/shared/blocks/WhiteSvgIcon";
import { Link } from "react-router";
import ImageWaterMark from '@/assets/images/image-watermark.webp'

const NewsArticles = () => {
    return (
        <section className="tp-container py-12 md:py-16 lg:py-20">
            <div className='flex flex-col sm:flex-row sm:items-end gap-2'>
                <div className='flex-1 mb-3 sm:mb-0'>
                    <h4 className="section-sub-title text-primary-950">
                        News & Articles
                    </h4>
                    <h2 className="section-title text-primary-950">
                        Stories, news & insights
                    </h2>
                </div>

                <div>
                    <Link className="tp-primary-btn inline-flex items-center gap-3" to="/turn-guider">
                        More Articles
                        <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
                    </Link>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-10">
                <div className="group">
                    <div className=" h-[300px] overflow-hidden rounded-2xl">
                        <img src={ImageWaterMark} alt="Blog Image" className="group-hover:scale-110 duration-300 overflow-hidden w-full h-full object-cover rounded-2xl" />
                    </div>
                    <p className='text-sm text-gray-600 font-medium mt-3'>January 10, 2026</p>
                    <h6 className='text-2xl font-bold text-primary-900 hover:text-primary-500 cursor-pointer duration-300 mt-3 mb-5'>Exploring The Green Spaces Of Realar Residence</h6>
                    <Link className="tp-transparent-black-btn !px-5 !py-3 inline-flex items-center gap-3" to="/#">
                        Read More
                        <WhiteSvgIcon className="w-4 h-4" />
                    </Link>
                </div>
                <div className="group">
                    <div className=" h-[300px] overflow-hidden rounded-2xl">
                        <img src={ImageWaterMark} alt="Blog Image" className="group-hover:scale-110 duration-300 overflow-hidden w-full h-full object-cover rounded-2xl" />
                    </div>
                    <p className='text-sm text-gray-600 font-medium mt-3'>January 10, 2026</p>
                    <h6 className='text-2xl font-bold text-primary-900 hover:text-primary-500 cursor-pointer duration-300 mt-3 mb-5'>Exploring The Green Spaces Of Realar Residence</h6>
                    <Link className="tp-transparent-black-btn !px-5 !py-3 inline-flex items-center gap-3" to="/#">
                        Read More
                        <WhiteSvgIcon className="w-4 h-4" />
                    </Link>
                </div>
                <div className="group">
                    <div className=" h-[300px] overflow-hidden rounded-2xl">
                        <img src={ImageWaterMark} alt="Blog Image" className="group-hover:scale-110 duration-300 overflow-hidden w-full h-full object-cover rounded-2xl" />
                    </div>
                    <p className='text-sm text-gray-600 font-medium mt-3'>January 10, 2026</p>
                    <h6 className='text-2xl font-bold text-primary-900 hover:text-primary-500 cursor-pointer duration-300 mt-3 mb-5'>Exploring The Green Spaces Of Realar Residence</h6>
                    <Link className="tp-transparent-black-btn !px-5 !py-3 inline-flex items-center gap-3" to="/#">
                        Read More
                        <WhiteSvgIcon className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NewsArticles;