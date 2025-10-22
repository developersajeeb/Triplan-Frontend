import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Keyboard } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const slides = [
  {
    title: "Louvre",
    desc: "National art museum in Paris, France. It is located on the Right Bank of the Seine and home to the Mona Lisa and the Venus de Milo.",
    link: "https://en.wikipedia.org/wiki/Louvre",
    img: "https://images.unsplash.com/photo-1543335785-8aadf6d8183c?auto=format&fit=crop&w=1932&q=80",
  },
  {
    title: "Seychelles",
    desc: "The Republic of Seychelles is an island country consisting of 155 islands in the Indian Ocean.",
    link: "https://en.wikipedia.org/wiki/Seychelles",
    img: "https://images.unsplash.com/photo-1618822461310-da1be362e30c?auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "London",
    desc: "The capital and largest city of England, standing on the River Thames with a history spanning nearly two millennia.",
    link: "https://en.wikipedia.org/wiki/London",
    img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1965&q=80",
  },
  {
    title: "Maldives",
    desc: "The Republic of Maldives is an archipelagic state in South Asia, situated in the Indian Ocean.",
    link: "https://en.wikipedia.org/wiki/Maldives",
    img: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1975&q=80",
  },
  {
    title: "Italy",
    desc: "Located in the Mediterranean Sea, Italy consists of a peninsula surrounded by several islands.",
    link: "https://en.wikipedia.org/wiki/Italy",
    img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1886&q=80",
  },
];

export default function DestinationSlider() {
  const [visible, setVisible] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const displayRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerDownRef = useRef(false);
  const lerp = (a: number, b: number, t = 0.18) => a + (b - a) * t;

  const animate = () => {
    const el = document.getElementById("drag-indicator");
    if (!el) {
      animRef.current = requestAnimationFrame(animate);
      return;
    }

    const tx = targetRef.current.x;
    const ty = targetRef.current.y;

    displayRef.current.x = lerp(displayRef.current.x, tx);
    displayRef.current.y = lerp(displayRef.current.y, ty);

    el.style.transform = `translate3d(${Math.round(displayRef.current.x)}px, ${Math.round(displayRef.current.y)}px, 0) translate(-50%, -50%)`;

    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!animRef.current) {
      animRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTargetFromEvent = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const offset = 20;
    targetRef.current.x = clientX - rect.left + offset;
    targetRef.current.y = clientY - rect.top + offset;
  };

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!visible && !pointerDownRef.current) return;
      updateTargetFromEvent(e.clientX, e.clientY);
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownRef.current = true;
      setVisible(true);
      updateTargetFromEvent(e.clientX, e.clientY);
    };

    const onPointerUp = (_e: PointerEvent) => {
      pointerDownRef.current = false;
      if (!containerRef.current) return;
      const inside = (document.elementFromPoint(
        (targetRef.current.x || 0) + (containerRef.current.getBoundingClientRect().left || 0),
        (targetRef.current.y || 0) + (containerRef.current.getBoundingClientRect().top || 0)
      )?.closest("section") === containerRef.current);
      if (!inside) setVisible(false);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [visible]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    setVisible(true);
    updateTargetFromEvent(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    if (pointerDownRef.current) return;
    setVisible(false);
  };

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center min-h-screen bg-white"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div
        id="drag-indicator"
        className={`pointer-events-none absolute z-20 bg-black/60 text-white w-20 h-20 flex items-center justify-center rounded-full text-sm font-medium backdrop-blur-md transition-opacity duration-300 ease-out transform`}
        style={{
          opacity: visible ? 1 : 0,
          left: 0,
          top: 0,
          willChange: "transform, opacity",
        }}
      >
        {'<'} Drag {'>'}
      </div>

      <Swiper
        effect="coverflow"
        centeredSlides={true}
        grabCursor
        loop={true}
        speed={800}
        keyboard={{ enabled: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Keyboard]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <Card className="group relative flex flex-col justify-end h-[35rem] overflow-hidden rounded-2xl shadow-lg">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <svg
                  className="absolute bottom-0 w-[300%] h-20 rotate-180"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity=".25"
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28..."
                    className="fill-white"
                  />
                </svg>
              </div>

              <div className="relative z-10 bg-white rounded-b-2xl p-6">
                <h2 className="font-raleway text-xl font-bold mb-2 capitalize text-gray-900">
                  {slide.title}
                </h2>
                <p className="text-gray-700 text-sm line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {slide.desc}
                </p>
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center shadow-md hover:bg-sky-600 transition-all ml-auto opacity-0 group-hover:opacity-100"
                >
                  <ArrowRight className="w-6 h-6 text-white" />
                </a>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
