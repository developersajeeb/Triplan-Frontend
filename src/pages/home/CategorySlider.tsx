import { useGetTourTypesQuery } from '@/redux/features/tour/tour.api';
import type { ITourType } from '@/types/tour.type';
import { useNavigate } from 'react-router';

type TourTypeCard = ITourType;

type TourTypeCardWithCount = TourTypeCard & {
  tourCount?: number;
  count?: number;
  totalTour?: number;
  totalTourListing?: number;
  toursCount?: number;
  tourListingsCount?: number;
  totalListing?: number;
  tourPackageCount?: number;
};

const buildTourTypeCards = (tourTypes?: ITourType[]): TourTypeCardWithCount[] => {
  if (!Array.isArray(tourTypes)) {
    return [];
  }

  return tourTypes.map((tourType) => tourType);
};

const getTourCount = (item: TourTypeCardWithCount) => {
  const count =
    item.tourCount ??
    item.count ??
    item.totalTour ??
    item.totalTourListing ??
    item.toursCount ??
    item.tourListingsCount ??
    item.totalListing ??
    item.tourPackageCount;

  return typeof count === 'number' && Number.isFinite(count) && count > 0 ? count : null;
};

export default function CategorySlider() {
  const navigate = useNavigate();
  const { data: tourTypes } = useGetTourTypesQuery({ limit: 10 });
  const tourTypeCards = buildTourTypeCards(tourTypes?.data);

  const handleViewTours = (tourTypeName: string) => {
    navigate(`/tours?tourType=${encodeURIComponent(tourTypeName)}&page=1`);
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-20 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.14),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_55%,_#eff6ff_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0)_30%,rgba(255,255,255,0.35)_100%)]" />
      <div className="relative tp-container">
        <div className="mb-8 flex flex-col gap-4 text-center sm:mb-10 lg:mb-12">
          <h4 className="section-sub-title text-center text-primary-950">Wonderful Place For You</h4>
          <h2 className="section-title text-center text-primary-950 mb-0">Tour Types</h2>
        </div>

        {tourTypeCards.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tourTypeCards.map((item, index) => (
              <article
                key={item._id}
                className="group relative overflow-hidden rounded-xl bg-white border-2 border-primary-100 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary-300 cursor-pointer"
              >
                <div className="flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {getTourCount(item) !== null && (
                      <span className="inline-flex rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700">
                        {getTourCount(item)}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">Explore this tour type</p>
                  </div>

                  <div className="pt-2 border-t border-primary-100">
                    <button onClick={() => handleViewTours(item.name)} className="inline-flex text-sm font-medium text-primary-600 hover:text-primary-700 gap-1 transition-colors cursor-pointer bg-none border-none p-0">
                      View tours
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-600 shadow-sm">
            No tour types available right now.
          </div>
        )}
      </div>
    </section>
  );
}