import bgImage from '@/assets/images/about-us/maps-world.svg';

const Achievements = () => {
    return (
        <section className='py-12 md:py-16 lg:py-20'>
            <div className='bg-no-repeat bg-cover bg-center tp-container' style={{backgroundImage: `url(${bgImage})`}}>
                <h4 className="section-sub-title text-primary-950 text-center">Trusted by Thousands</h4>
                <h2 className="section-title text-primary-950 mb-2 text-center">Numbers That Define Our Journey</h2>
                <p className="section-heading-paragraph mb-6 sm:mb-8 text-center max-w-3xl mx-auto">From happy customers to trusted local partners, our growing community reflects the quality, trust, and unforgettable experiences we deliver every day.</p>

                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                    <div className='border border-primary-400 p-6 rounded-2xl'>
                        <h6 className='text-4xl font-semibold mb-1 text-primary-400'>10,000+</h6>
                        <p className='text-lg font-medium text-primary-600'>Happy Customers</p>
                    </div>
                    <div className='border border-primary-400 p-6 rounded-2xl'>
                        <h6 className='text-4xl font-semibold mb-1 text-primary-400'>5,000+</h6>
                        <p className='text-lg font-medium text-primary-600'>Tours and Activities</p>
                    </div>
                    <div className='border border-primary-400 p-6 rounded-2xl'>
                        <h6 className='text-4xl font-semibold mb-1 text-primary-400'>50+</h6>
                        <p className='text-lg font-medium text-primary-600'>Cities Across the Country</p>
                    </div>
                    <div className='border border-primary-400 p-6 rounded-2xl'>
                        <h6 className='text-4xl font-semibold mb-1 text-primary-400'>200+</h6>
                        <p className='text-lg font-medium text-primary-600'>Local Partners</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;