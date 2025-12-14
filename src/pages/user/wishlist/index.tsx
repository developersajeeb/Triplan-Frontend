import TourCardList from "@/components/modules/tour/TourCardList";
import TourListTypeLoader from "@/components/shared/blocks/TourListTypeLoader";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import type { ITourPackage } from "@/types";


const Wishlist = () => {

    const { data: toursData, isLoading } = useGetAllToursQuery({ limit: "5" });

    return (
        <>
            <h2 className="text-xl font-bold text-primary-950 mb-4">Wishlist</h2>

            <section className="space-y-4">
                {isLoading ? (
                    [...Array(3)].map((_, i) => (
                        <TourListTypeLoader key={i} />
                    ))
                ) : (toursData?.data ?? []).length > 0 ? (
                    (toursData?.data ?? []).map((tour: ITourPackage) => (
                        <TourCardList key={tour.slug} tour={tour} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center font-medium">
                        No wishlist tours found.
                    </p>
                )}
            </section>
        </>
    );
};

export default Wishlist;