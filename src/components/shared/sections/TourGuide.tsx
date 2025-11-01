import { Link } from 'react-router';
import WhiteSvgIcon from '../blocks/WhiteSvgIcon';
import ImageWaterMark from '@/assets/images/image-watermark.webp'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { RiLinkedinLine } from 'react-icons/ri';

const TourGuide = () => {
    return (
        <section className="tp-container py-12 md:py-16 lg:py-20">
            <div className='flex flex-col sm:flex-row sm:items-end gap-2'>
                <div className='flex-1 mb-3'>
                    <h4 className="section-sub-title text-primary-950">
                        Meet with Guide
                    </h4>
                    <h2 className="section-title text-primary-950">
                        Tour Guide
                    </h2>
                    <p className="section-heading-paragraph max-w-[550px]">
                        Meet friendly tour guides who make every trip exciting, informative, and truly unforgettable.
                    </p>
                </div>

                <div>
                    <Link className="tp-primary-btn inline-flex items-center gap-3" to="/turn-guider">
                        All Guides
                        <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
                    </Link>
                </div>
            </div>

            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>
                <div>
                    <img src={ImageWaterMark} alt="Tour Guide" className="w-full h-[280px] object-cover rounded-2xl" />
                    <h6 className='text-2xl font-bold text-primary-900 mt-3 mb-1'>Sajeeb Debnath</h6>
                    <p className='text-sm text-gray-600 font-medium mb-1'><span className='bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-[2px]'>4.8</span> <span className='hover:underline cursor-pointer duration-300'>(180 Reviews)</span></p>
                    <ul className='flex gap-2 mt-4'>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaFacebookF size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaInstagram size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><RiLinkedinLine size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaYoutube size={18} /></span></Link></li>
                    </ul>
                </div>
                <div>
                    <img src={ImageWaterMark} alt="Tour Guide" className="w-full h-[280px] object-cover rounded-2xl" />
                    <h6 className='text-2xl font-bold text-primary-900 mt-3 mb-1'>Sajeeb Debnath</h6>
                    <p className='text-sm text-gray-600 font-medium mb-1'><span className='bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-[2px]'>4.8</span> <span className='hover:underline cursor-pointer duration-300'>(180 Reviews)</span></p>
                    <ul className='flex gap-2 mt-4'>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaFacebookF size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaInstagram size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><RiLinkedinLine size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaYoutube size={18} /></span></Link></li>
                    </ul>
                </div>
                <div>
                    <img src={ImageWaterMark} alt="Tour Guide" className="w-full h-[280px] object-cover rounded-2xl" />
                    <h6 className='text-2xl font-bold text-primary-900 mt-3 mb-1'>Sajeeb Debnath</h6>
                    <p className='text-sm text-gray-600 font-medium mb-1'><span className='bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-[2px]'>4.8</span> <span className='hover:underline cursor-pointer duration-300'>(180 Reviews)</span></p>
                    <ul className='flex gap-2 mt-4'>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaFacebookF size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaInstagram size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><RiLinkedinLine size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaYoutube size={18} /></span></Link></li>
                    </ul>
                </div>
                <div>
                    <img src={ImageWaterMark} alt="Tour Guide" className="w-full h-[280px] object-cover rounded-2xl" />
                    <h6 className='text-2xl font-bold text-primary-900 mt-3 mb-1'>Sajeeb Debnath</h6>
                    <p className='text-sm text-gray-600 font-medium mb-1'><span className='bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-[2px]'>4.8</span> <span className='hover:underline cursor-pointer duration-300'>(180 Reviews)</span></p>
                    <ul className='flex gap-2 mt-4'>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaFacebookF size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaInstagram size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><RiLinkedinLine size={18} /></span></Link></li>
                        <li><Link to='#' target='_blank'><span className='text-primary-400 hover:text-white cursor-pointer duration-300 w-8 h-8 flex items-center justify-center rounded-full border border-primary-400 hover:bg-primary-400'><FaYoutube size={18} /></span></Link></li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default TourGuide;