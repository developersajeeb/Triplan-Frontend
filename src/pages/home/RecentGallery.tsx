import gImg1 from "@/assets/images/recent-gallery/g-img-1.webp";
import gImg2 from "@/assets/images/recent-gallery/g-img-2.webp";
import gImg3 from "@/assets/images/recent-gallery/g-img-3.webp";
import gImg4 from "@/assets/images/recent-gallery/g-img-4.webp";
import gImg5 from "@/assets/images/recent-gallery/g-img-5.webp";
import gImg6 from "@/assets/images/recent-gallery/g-img-6.webp";
import gImg7 from "@/assets/images/recent-gallery/g-img-7.webp";

const RecentGallery = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary-50">
      <div className="tp-container">
        <h4 className="section-sub-title text-primary-950 text-center">
          Make Your Tour More Pleasure
        </h4>
        <h2 className="section-title text-primary-950 mb-6 sm:mb-8 text-center">
          Recent Gallery
        </h2>

        <div className="hidden md:grid grid-cols-5 gap-5 items-center">
          <div>
            <img
              className="w-full h-[180px] lg:h-[220px] object-cover rounded-2xl"
              src={gImg1}
              alt="Recent Gallery image one"
            />
          </div>
          <div className="space-y-5">
            <img
              className="w-full h-[160px] lg:h-[200px] object-cover rounded-2xl"
              src={gImg2}
              alt="Recent Gallery image one"
            />
            <img
              className="w-full h-[160px] lg:h-[200px] object-cover rounded-2xl"
              src={gImg3}
              alt="Recent Gallery image one"
            />
          </div>
          <div>
            <img
              className="w-full h-[340px] lg:h-[420px] object-cover rounded-2xl"
              src={gImg4}
              alt="Recent Gallery image one"
            />
          </div>
          <div className="space-y-5">
            <img
              className="w-full h-[160px] lg:h-[200px] object-cover rounded-2xl"
              src={gImg5}
              alt="Recent Gallery image one"
            />
            <img
              className="w-full h-[160px] lg:h-[200px] object-cover rounded-2xl"
              src={gImg6}
              alt="Recent Gallery image one"
            />
          </div>
          <div>
            <img
              className="w-full h-[180px] lg:h-[220px] object-cover rounded-2xl"
              src={gImg7}
              alt="Recent Gallery image one"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 md:hidden">
            <img
              className="w-full h-[180px] object-cover rounded-2xl"
              src={gImg1}
              alt="Recent Gallery image one"
            />
            <img
              className="w-full h-[180px] object-cover rounded-2xl"
              src={gImg2}
              alt="Recent Gallery image one"
            />
            <img
              className="w-full h-[180px] object-cover rounded-2xl"
              src={gImg3}
              alt="Recent Gallery image one"
            />
            <img
              className="w-full h-[180px] object-cover rounded-2xl"
              src={gImg4}
              alt="Recent Gallery image one"
            />
            <img
              className="w-full h-[180px] object-cover rounded-2xl"
              src={gImg5}
              alt="Recent Gallery image one"
            />
            <img
              className="w-full h-[180px] object-cover rounded-2xl"
              src={gImg6}
              alt="Recent Gallery image one"
            />
            <img
              className="w-full h-[180px] object-cover rounded-2xl"
              src={gImg7}
              alt="Recent Gallery image one"
            />
        </div>
      </div>
    </section>
  );
};

export default RecentGallery;
