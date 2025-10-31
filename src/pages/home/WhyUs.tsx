import { RiVipCrownLine } from 'react-icons/ri';
import bgImage from '../../assets/images/line-pattern.png'
import { LuTickets } from 'react-icons/lu';
import { TbPackages } from 'react-icons/tb';
import { PiSealCheckBold } from 'react-icons/pi';

const WhyUs = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-cover bg-no-repeat bg-center bg-gray-50" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className='tp-container'>
                <h4 className="section-sub-title text-primary-950 text-center">Let’s Go Together</h4>
                <h2 className="section-title text-primary-950 mb-6 sm:mb-8 text-center">Why Plan Your Trip With Us</h2>

                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                    <div className='p-5 bg-white rounded-2xl border border-gray-200 text-center'>
                        <div className='bg-primary-200 w-12 h-12 mx-auto flex items-center justify-center rounded-full text-primary-600'><RiVipCrownLine size={20}  /></div>
                        <p className='text-[22px] text-gray-800 font-bold mt-4 mb-1'>VIP Packages</p>
                        <p className='text-base text-gray-600 font-medium'>Include premium seating, meet-and-greet experiences, backstage tours</p>
                    </div>
                    <div className='p-5 bg-white rounded-2xl border border-gray-200 text-center'>
                        <div className='bg-primary-200 w-12 h-12 mx-auto flex items-center justify-center rounded-full text-primary-600'><LuTickets size={20}  /></div>
                        <p className='text-[22px] text-gray-800 font-bold mt-4 mb-1'>Concert Tickets</p>
                        <p className='text-base text-gray-600 font-medium'>A centralized place to buy tickets for various dates of the tour</p>
                    </div>
                    <div className='p-5 bg-white rounded-2xl border border-gray-200 text-center'>
                        <div className='bg-primary-200 w-12 h-12 mx-auto flex items-center justify-center rounded-full text-primary-600'><TbPackages size={20}  /></div>
                        <p className='text-[22px] text-gray-800 font-bold mt-4 mb-1'>Tour Packages</p>
                        <p className='text-base text-gray-600 font-medium'>Bundles that include concert tickets, accommodations</p>
                    </div>
                    <div className='p-5 bg-white rounded-2xl border border-gray-200 text-center'>
                        <div className='bg-primary-200 w-12 h-12 mx-auto flex items-center justify-center rounded-full text-primary-600'><PiSealCheckBold size={20}  /></div>
                        <p className='text-[22px] text-gray-800 font-bold mt-4 mb-1'>Best Price Guarantee</p>
                        <p className='text-base text-gray-600 font-medium'>Such as private rehearsals, soundcheck access,</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;