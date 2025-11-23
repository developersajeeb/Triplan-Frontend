import DestinationCard from "@/components/modules/destination/DestinationCard";
import PageBanner from "@/components/shared/sections/PageBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import type { IDivision } from "@/types/division.type";
import React from "react";


const DestinationsPage = () => {
    const { data: divisions, isLoading } = useGetDivisionsQuery(undefined);

    return (
        <>
            <PageBanner title='Destinations' />
            {isLoading ? (
                <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 tp-container py-10 md:py-16">
                    <Skeleton className="h-[420px] rounded-2xl"></Skeleton>
                    <Skeleton className="h-[420px] rounded-2xl"></Skeleton>
                    <Skeleton className="h-[420px] rounded-2xl"></Skeleton>
                </section>
            ) : (
                <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 tp-container py-10 md:py-16">
                    {
                        divisions?.map((item: IDivision) => (
                            <React.Fragment key={item._id}>
                                <DestinationCard item={item} />
                            </React.Fragment>
                        ))
                    }
                </section>
            )}
        </>
    );
};

export default DestinationsPage;