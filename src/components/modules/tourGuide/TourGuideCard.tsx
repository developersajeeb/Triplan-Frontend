import { Link } from 'react-router';
import ImageWaterMark from '@/assets/images/image-watermark.webp'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { RiLinkedinLine } from 'react-icons/ri';
import { FaStar } from 'react-icons/fa';
import WhiteSvgIcon from '@/components/shared/blocks/WhiteSvgIcon';

const TourGuideCard = () => {
    return (
        <div className='group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
            {/* Decorative header strip with avatar */}
            <div className='relative bg-gradient-to-br from-primary-100 to-primary-200 h-[90px]'>
                {/* Tours badge */}
                <div className='absolute top-3 right-3 bg-primary-500 text-white text-xs font-semibold rounded-full px-2.5 py-1'>
                    5 Tours
                </div>
                {/* Circular avatar — overlaps the strip and content area */}
                <div className='absolute -bottom-12 left-1/2 -translate-x-1/2'>
                    <div className='w-24 h-24 rounded-full ring-4 ring-white overflow-hidden group-hover:ring-primary-300 transition-all duration-300'>
                        <img
                            src={ImageWaterMark}
                            alt="Tour Guide"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>

            {/* Content section */}
            <div className='pt-14 pb-5 px-5'>
                {/* Name & title */}
                <div className='text-center mb-3'>
                    <h6 className='text-lg font-bold text-primary-900 mb-0.5'>Sajeeb Debnath</h6>
                    <p className='text-sm text-gray-500 font-medium'>Professional Tour Guide</p>
                </div>

                {/* Rating row */}
                <div className='flex items-center justify-center gap-1 mb-4'>
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={13} className={i < 4 ? 'text-[#FFCA18]' : 'text-[#FFCA18] opacity-40'} />
                    ))}
                    <span className='text-xs font-bold text-gray-700 ml-1'>4.8</span>
                    <span className='text-xs text-gray-400'>(180 reviews)</span>
                </div>

                {/* Divider */}
                <div className='border-t border-dashed border-gray-200 mb-4' />

                {/* Social links */}
                <div className='flex items-center justify-center gap-2 mb-4'>
                    <Link to='#' target='_blank'>
                        <span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-200 hover:bg-primary-500 hover:border-primary-500'>
                            <FaFacebookF size={13} />
                        </span>
                    </Link>
                    <Link to='#' target='_blank'>
                        <span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-200 hover:bg-primary-500 hover:border-primary-500'>
                            <FaInstagram size={13} />
                        </span>
                    </Link>
                    <Link to='#' target='_blank'>
                        <span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-200 hover:bg-primary-500 hover:border-primary-500'>
                            <RiLinkedinLine size={14} />
                        </span>
                    </Link>
                    <Link to='#' target='_blank'>
                        <span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-200 hover:bg-primary-500 hover:border-primary-500'>
                            <FaYoutube size={13} />
                        </span>
                    </Link>
                </div>

                {/* CTA Button */}
                <Link
                    to='#'
                    className='tp-primary-btn w-full flex items-center justify-center gap-2 text-sm'
                >
                    View Profile
                    <WhiteSvgIcon className='w-3.5 h-3.5' />
                </Link>
            </div>
        </div>
    );
};

export default TourGuideCard;