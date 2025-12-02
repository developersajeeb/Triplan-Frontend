import WhiteSvgIcon from "@/components/shared/blocks/WhiteSvgIcon";
import { Link } from "react-router";
import ImageWaterMark from '@/assets/images/image-watermark.webp'

const BlogCard = () => {
    return (
        <div className="group">
            <div className="h-[250px] overflow-hidden rounded-2xl">
                <img src={ImageWaterMark} alt="Blog Image" className="group-hover:scale-110 duration-300 overflow-hidden w-full h-full object-cover rounded-2xl" />
            </div>
            <p className='text-sm text-gray-600 font-medium mt-3'>January 10, 2026</p>
            <h6 className='text-2xl font-bold text-primary-900 hover:text-primary-500 cursor-pointer duration-300 mt-3 mb-5'>Exploring The Green Spaces Of Realar Residence</h6>
            <Link className="tp-transparent-black-btn !px-5 !py-3 inline-flex items-center gap-3" to="/#">
                Read More
                <WhiteSvgIcon className="w-4 h-4" />
            </Link>
        </div>
    );
};

export default BlogCard;