import { Link } from 'react-router';
import WhiteSvgIcon from '../../shared/blocks/WhiteSvgIcon';
import TourGuideCard from './TourGuideCard';

const TourGuide = () => {
    return (
        <section className="tp-container py-12 md:py-16 lg:py-20">
            <div className='flex flex-col sm:flex-row sm:items-end gap-2'>
                <div className='flex-1 mb-3 sm:mb-0'>
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
                    <Link className="tp-primary-btn inline-flex items-center gap-3" to="/tour-guide">
                        All Guides
                        <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
                    </Link>
                </div>
            </div>

            <div className='relative mt-10'>
                {/* Blurred cards */}
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 blur-sm pointer-events-none select-none'>
                    <TourGuideCard />
                    <TourGuideCard />
                    <TourGuideCard />
                    <TourGuideCard />
                </div>

                {/* Coming Soon overlay */}
                <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='bg-white/90 backdrop-blur-md border border-primary-100 rounded-2xl shadow-xl px-10 py-8 text-center max-w-sm mx-auto'>
                        <div className='w-14 h-14 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center mx-auto mb-4'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='w-7 h-7 text-primary-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z' />
                            </svg>
                        </div>
                        <span className='inline-block bg-primary-100 text-primary-600 text-xs font-semibold rounded-full px-3 py-1 mb-3 tracking-wide uppercase'>Coming Soon</span>
                        <h3 className='text-xl font-bold text-primary-900 mb-2'>Tour Guides Feature</h3>
                        <p className='text-sm text-gray-500 leading-relaxed'>We're working on connecting you with amazing tour guides. Stay tuned — this feature is launching soon!</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TourGuide;