import TourBg from '@/assets/images/tour_login_bg.jpg'
import RegImage from '@/assets/images/reg-page-img.svg'
import { RxCross2 } from "react-icons/rx";
import TriPlanBanner from "@/assets/images/seo/triplan-banner.webp";
import { Link } from "react-router";
import { RegisterFrom } from './RegisterFrom';
import CommonMetadata from '@/components/utilities/CommonMetadata';
import JsonLd from '@/components/utilities/JsonLd';

export default function RegistrationPage() {
  return (
    <>
      <div className='rounded-[20px] grid grid-cols-1 lg:grid-cols-2 min-h-svh'>
        <img className='w-full min-h-full h-full object-cover order-2 lg:order-1' src={RegImage} alt="login image" />

        <div className='order-1 lg:order-2 bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center' style={{ backgroundImage: `url(${TourBg})` }}>
          <Link to={'/'} className='absolute top-0 right-0 cursor-pointer z-50 w-12 h-12 flex items-center justify-center bg-white rounded-l-full rounded-b-full shadow-sm'><RxCross2 size={22} /></Link>
          <RegisterFrom />
        </div>
      </div>

      <CommonMetadata
        title="Create Account – Join triPlan Today"
        description="Register your triplan account to access personalized tour recommendations, save destinations, and manage your travel bookings easily."
        featureImage={TriPlanBanner}
        canonicalUrl="https://triplan.developersajeeb.com/registration"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Register – triPlan",
          description:
            "Create your triPlan account and start exploring personalized tour packages and exclusive travel features.",
          url: "https://triplan.developersajeeb.com/registration"
        }}
      />
    </>
  );
}