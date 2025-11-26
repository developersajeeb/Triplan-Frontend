import DestinationCard from "@/components/modules/destination/DestinationCard";
import PageBanner from "@/components/shared/sections/PageBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import type { IDivision } from "@/types/division.type";
import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { RiSearch2Line } from "react-icons/ri";
import PaginationComponent from "@/components/ui/PaginationComponent";

const DestinationsPage = () => {
    const form = useForm();
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const page = searchParams.get("page") || "1";

    const queryParams: Record<string, string> = {};
    if (search) queryParams.search = search;
    if (page) queryParams.page = page;

    const { data: divisionRes, isLoading } = useGetDivisionsQuery(queryParams);
    
    const divisions = divisionRes?.data ?? [];
    const meta = divisionRes?.meta;

    useEffect(() => {
        form.setValue("search", search);
    }, [search, form]);

    const onSubmit = (data: FieldValues) => {
        const value = data.search?.trim() ?? "";

        if (value) {
            searchParams.set("search", value);
        } else {
            searchParams.delete("search");
        }
        setSearchParams(searchParams);
    };

    return (
        <>
            <PageBanner title='Destinations' />
            <section className="px-5 pt-8 tp-container">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[250px]">
                        <FormField
                            control={form.control}
                            name="search"
                            rules={{ required: "Please enter a search term" }}
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value || ""}
                                                type="text"
                                                className="tp-input w-full !pr-12"
                                                placeholder="Search tour guide..."
                                            />
                                        </FormControl>
                                        <Button type="submit" size="icon" className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1">
                                            <RiSearch2Line className="!h-[18px] !w-[18px]" />
                                        </Button>
                                    </div>

                                    <FormMessage className="!mt-1" />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </section>

            {isLoading ? (
                <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 tp-container py-10 md:py-16">
                    <Skeleton className="h-[420px] rounded-2xl" />
                    <Skeleton className="h-[420px] rounded-2xl" />
                    <Skeleton className="h-[420px] rounded-2xl" />
                </section>
            ) : (
                <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 tp-container py-10 md:py-16">
                    {divisions.map((item: IDivision) => (
                        <DestinationCard key={item._id} item={item} />
                    ))}
                </section>
            )}

            {meta && (
                <div className="mt-6 tp-container pb-12">
                    <PaginationComponent
                        currentPage={meta.page}
                        totalPages={meta.totalPage}
                        onPageChange={(newPage) => {
                            searchParams.set("page", String(newPage));
                            setSearchParams(searchParams);
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default DestinationsPage;