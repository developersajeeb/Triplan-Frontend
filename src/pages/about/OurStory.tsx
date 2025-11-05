import image1 from '@/assets/images/about-us/out-story-1.jpg';
import image2 from '@/assets/images/about-us/out-story-2.jpg';
import image3 from '@/assets/images/about-us/out-story-3.jpg';

const OurStory = () => {
    return (
        <section className="tp-container py-12 md:py-16 lg:py-20 grid md:grid-cols-2 gap-6 lg:gap-8">
            <div>
                <h4 className="section-sub-title text-primary-950">
                    Our story
                </h4>
                <h2 className="section-title text-primary-950 mb-4">
                    Discover the Story Behind triPlan
                </h2>
                <p className="section-heading-paragraph">
                    At TriPlan, we believe every journey tells a story — one that deserves to be planned with care, passion, and purpose. What started as a small idea to simplify travel planning has now grown into a trusted platform for explorers around the world. Our mission is to make discovering new destinations easier, more enjoyable, and truly memorable.
                    <br />
                    From exotic beaches to hidden mountain trails, TriPlan connects you with the perfect experiences that fit your dream getaway. With reliable tour packages, personalized recommendations, and transparent pricing, we ensure your adventure starts long before you reach your destination.
                </p>
            </div>
            <div className='grid grid-cols-2 gap-5 max-w-[500px] md::max-w-fit mx-auto md:mx-0 max-h-[300px] sm:max-h-[400px] md:max-h-[500px] h-full'>
                <img src={image1} alt="Our Story" className="w-full h-full object-cover rounded-t-full rounded-l-full" />
                <div className='space-y-5'>
                    <img src={image2} alt="Our Story" className="w-full h-[130px] sm:h-[180px] md:h-[240px] object-cover rounded-t-full rounded-r-full" />
                    <img src={image3} alt="Our Story" className="w-full h-[130px] sm:h-[180px] md:h-[240px] object-cover rounded-b-full rounded-r-full" />
                </div>
            </div>
        </section>
    );
};

export default OurStory;