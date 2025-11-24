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

            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>
                <TourGuideCard />
                <TourGuideCard />
                <TourGuideCard />
                <TourGuideCard />
            </div>
        </section>
    );
};

export default TourGuide;