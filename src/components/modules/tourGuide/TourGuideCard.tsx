import { Link } from 'react-router';
import ImageWaterMark from '@/assets/images/image-watermark.webp'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { RiLinkedinLine } from 'react-icons/ri';

const TourGuideCard = () => {
    return (
        <div className='bg-gray-50 p-4 rounded-2xl text-center'>
            <img src={ImageWaterMark} alt="Tour Guide" className="w-full h-[240px] object-cover rounded-2xl" />
            <h6 className='text-[22px] font-bold text-primary-900 mt-3 mb-1'>Sajeeb Debnath</h6>
            <p className='text-base font-semibold text-gray-600 mb-1'>Total 5 Tour Completed</p>
            <p className='text-sm text-gray-600 font-medium mb-1'><span className='bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-[2px]'>4.8</span> <span className='hover:underline cursor-pointer duration-300'>(180 Reviews)</span></p>
            <ul className='flex gap-2 mt-4 justify-center'>
                <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-7 h-7 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaFacebookF size={16} /></span></Link></li>
                <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-7 h-7 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaInstagram size={16} /></span></Link></li>
                <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-7 h-7 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><RiLinkedinLine size={16} /></span></Link></li>
                <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-7 h-7 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaYoutube size={16} /></span></Link></li>
            </ul>
        </div>
    );
};

export default TourGuideCard;