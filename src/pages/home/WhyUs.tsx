import bgImage from '../../assets/images/line-pattern.png'

const WhyUs = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-cover bg-no-repeat bg-center bg-gray-50" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='tp-container'>
                <h4 className="section-sub-title text-primary-950 text-center">Let’s Go Together</h4>
                <h2 className="section-title text-primary-950 mb-4 text-center">Why Plan Your Trip With Us</h2>

                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                    <div className='p-5 bg-white rounded-xl border border-gray-200'></div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;