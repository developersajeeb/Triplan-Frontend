// import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { useParams } from "react-router";

export default function Booking() {
  const { slug } = useParams();
  const { data: tourData, isLoading, isError } = useGetAllToursQuery({ slug: slug! });
  // const [createBooking] = useCreateBookingMutation();

  // const handleBooking = async () => {
  //   let bookingData;

  //   try {
  //     const res = await createBooking(bookingData).unwrap();
  //     if (res.success) {
  //       window.open(res.data.paymentUrl);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // const bookingSchema = tourData && {
  //   "@context": "https://schema.org",
  //   "@type": "Product",
  //   name: tourData.title,
  //   description: tourData.description,
  //   image: tourData.images,
  //   sku: tourData._id,
  //   brand: {
  //     "@type": "Organization",
  //     name: "triPlan",
  //     url: "https://triplan.developersajeeb.com"
  //   },
  //   offers: {
  //     "@type": "Offer",
  //     url: `https://triplan.developersajeeb.com/booking/${tourData.slug}`,
  //     priceCurrency: "USD",
  //     price: totalAmount || tourData.costFrom,
  //     availability: tourData.maxGuest > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
  //     eligibleQuantity: {
  //       "@type": "QuantitativeValue",
  //       maxValue: tourData.maxGuest,
  //       value: guestCount
  //     },
  //     validFrom: tourData.startDate,
  //   },
  //   tour: {
  //     "@type": "TouristTrip",
  //     name: tourData.title,
  //     itinerary: tourData.tourPlan
  //   },
  //   areaServed: tourData.location
  // };

  return (
    <>
      {/* <CommonMetadata
        title={tourData?.title + " – Book Your Tour with triplan"}
        description={tourData?.description || "Book your tour with triplan. Check availability, pricing, and get a seamless travel experience."}
        featureImage={tourData?.images[0] || TriPlanBanner}
        canonicalUrl={`https://triplan.developersajeeb.com/booking/${tourData?.slug}`}
      />
      <JsonLd data={bookingSchema} /> */}

      <div className="flex flex-col md:flex-row gap-8 p-6 container mx-auto">
        {!isLoading && isError && (
          <div>
            <p>Something Went Wrong!!</p>{" "}
          </div>
        )}

        {!isLoading && !tourData && (
          <div>
            <p>No Data Found</p>
          </div>
        )}

        {!isLoading && !isError && tourData && (
          <>
            {/* Left Section - Tour Summary */}
            <div className="flex-1 space-y-6">

            </div>

            {/* Right Section - Booking Details */}
            <div className="w-full md:w-96">
              <div className="border border-muted p-6 rounded-lg shadow-md sticky top-6">
                <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

                
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}