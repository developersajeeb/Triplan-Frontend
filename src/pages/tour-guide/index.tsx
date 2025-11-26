import TourGuideCard from "@/components/modules/tourGuide/TourGuideCard";
import PageBanner from "@/components/shared/sections/PageBanner";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useForm, type FieldValues } from "react-hook-form";
import { RiSearch2Line } from "react-icons/ri";
import { useSearchParams } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FiStar } from "react-icons/fi";


const TourGuider = () => {
  const form = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort") || undefined;

  const handleSortChange = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  const handleResetSort = () => {
    searchParams.delete("sort");
    setSearchParams(searchParams);
  };

  const onSubmit = (data: FieldValues) => {
    searchParams.set("search", data.search || "");
    setSearchParams(searchParams);
  };

  return (
    <>
      <PageBanner title="Tour Guide" />

      <section className="px-5 pt-8 tp-container flex flex-wrap gap-5 justify-between">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-auto">
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
                        className="tp-input w-full sm:w-auto !pr-12"
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

        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-600">Short By:</p>
          <Select value={sortValue} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[160px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5star"><span className="text-gray-500 font-semibold flex items-center gap-1"><FiStar size={16} /> 5 Star</span></SelectItem>
              <SelectItem value="4star"><span className="text-gray-500 font-semibold flex items-center gap-1"><FiStar size={16} /> 4 Star</span></SelectItem>
              <SelectItem value="3star"><span className="text-gray-500 font-semibold flex items-center gap-1"><FiStar size={16} /> 3 Star</span></SelectItem>
              <SelectItem value="2star"><span className="text-gray-500 font-semibold flex items-center gap-1"><FiStar size={16} /> 2 Star</span></SelectItem>
              <SelectItem value="1star"><span className="text-gray-500 font-semibold flex items-center gap-1"><FiStar size={16} /> 1 Star</span></SelectItem>
              <div className="border-t mt-2 pt-2 px-2 pb-1">
                <button
                  onClick={handleResetSort}
                  className="w-full text-center py-2 text-sm font-medium rounded-md bg-red-100 hover:bg-red-200 text-red-700"
                >
                  Reset
                </button>
              </div>

            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 tp-container py-10 md:py-14">
        <TourGuideCard />
        <TourGuideCard />
        <TourGuideCard />
        <TourGuideCard />
      </section>
    </>
  );
};

export default TourGuider;