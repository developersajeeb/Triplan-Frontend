import MultipleImageUploader from "@/components/shared/uploaders/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TimePickerInput } from "@/components/ui/timepicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useAddTourMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import type { IErrorResponse } from "@/types";
import { convertTo24HourTime } from "@/utils/time";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { useFieldArray, useForm } from "react-hook-form";
import { TbDatabaseEdit, TbFileDescription, TbMoneybag } from "react-icons/tb";
import { toast } from "sonner";
import z from "zod";
import { MdOutlineJoinRight } from "react-icons/md";
import { BsFillPatchQuestionFill } from "react-icons/bs";

const batchSchema = z.object({
  costFrom: z.string().min(1, "Cost is required"),
  sellingPrice: z.string().min(1, "Selling price is required"),
  startDate: z.date({ message: "Start date is required" }),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.date({ message: "End date is required" }),
  endTime: z.string().min(1, "End time is required"),
  regEndDate: z.date({ message: "Registration end date is required" }),
  maxSeat: z.string().min(1, "Max seat is required"),
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  departureLocation: z.string().min(1, "Departure location is required"),
  arrivalLocation: z.string().min(1, "Arrival location is required"),
  batches: z.array(batchSchema).min(1, "At least one batch is required"),
  included: z.array(z.object({ value: z.string() })),
  excluded: z.array(z.object({ value: z.string() })),
  amenities: z.array(z.object({ value: z.string() })),
  tourPlan: z.array(z.object({ value: z.string() })),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })),
  minAge: z.string().min(1, "Minimum age is required"),
  division: z.string().min(1, "Division is required"),
  tourType: z.string().min(1, "Tour type is required"),
});

export default function AddTour() {
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);
  const { data: tourTypeData } = useGetTourTypesQuery(undefined);
  const [addTour] = useAddTourMutation();

  const divisionOptions = divisionData?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );

  const tourTypeOptions = tourTypeData?.data?.map(
    (tourType: { _id: string; name: string }) => ({
      value: tourType._id,
      label: tourType.name,
    })
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      departureLocation: "",
      arrivalLocation: "",
      minAge: "",
      division: "",
      tourType: "",
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      amenities: [{ value: "" }],
      tourPlan: [{ value: "" }],
      faq: [{ question: "", answer: "" }],
      batches: [
        {
          costFrom: "",
          sellingPrice: "",
          startDate: new Date(),
          startTime: "",
          endDate: new Date(),
          endTime: "",
          regEndDate: new Date(),
          maxSeat: "",
        },
      ],
    },
  });

  const {
    fields: batchFields,
    append: appendBatch,
    remove: removeBatch,
  } = useFieldArray({
    control: form.control,
    name: "batches",
  });

  const {
    fields: includedFields,
    append: appendIncluded,
    remove: removeIncluded,
  } = useFieldArray({
    control: form.control,
    name: "included",
  });

  const {
    fields: excludedFields,
    append: appendExcluded,
    remove: removeExcluded,
  } = useFieldArray({
    control: form.control,
    name: "excluded",
  });

  const {
    fields: amenitiesFields,
    append: appendAmenities,
    remove: removeAmenities,
  } = useFieldArray({
    control: form.control,
    name: "amenities",
  });

  const {
    fields: tourPlanFields,
    append: appendTourPlan,
    remove: removeTourPlan,
  } = useFieldArray({
    control: form.control,
    name: "tourPlan",
  });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control: form.control,
    name: "faq",
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Creating tour....");
    if (images.length === 0) {
      toast.error("Please add some images", { id: toastId });
      return;
    }

    const divisionName = divisionOptions?.find((d: { value: string; }) => d.value === data.division)?.label || "";
    const tourTypeName = tourTypeOptions?.find((t: { value: string; }) => t.value === data.tourType)?.label || "";

    const normalizedBatches = data.batches.map((batch) => ({
      costFrom: Number(batch.costFrom),
      sellingPrice: Number(batch.sellingPrice),
      startDate: formatISO(batch.startDate),
      startTime: convertTo24HourTime(batch.startTime),
      endDate: formatISO(batch.endDate),
      endTime: convertTo24HourTime(batch.endTime),
      regEndDate: formatISO(batch.regEndDate),
      maxSeat: Number(batch.maxSeat),
      minAge: Number(data.minAge),
    }));

    const firstBatch = normalizedBatches[0];

    const tourData = {
      ...data,
      costFrom: firstBatch.costFrom,
      sellingPrice: firstBatch.sellingPrice,
      minAge: Number(data.minAge),
      startDate: firstBatch.startDate,
      endDate: firstBatch.endDate,
      regEndDate: firstBatch.regEndDate,
      batches: normalizedBatches,
      included:
        data.included[0]?.value === ""
          ? []
          : data.included
            .map((item: { value: string }) => item.value.trim())
            .filter(Boolean),
      excluded:
        data.excluded[0]?.value === ""
          ? []
          : data.excluded
            .map((item: { value: string }) => item.value.trim())
            .filter(Boolean),
      amenities:
        data.amenities[0]?.value === ""
          ? []
          : data.amenities
            .map((item: { value: string }) => item.value.trim())
            .filter(Boolean),
      tourPlan:
        data.tourPlan[0]?.value === ""
          ? []
          : data.tourPlan
            .map((item: { value: string }) => item.value.trim())
            .filter(Boolean),
      faq:
        data.faq[0]?.question === "" && data.faq[0]?.answer === ""
          ? []
          : data.faq
            .map((item: { question: string; answer: string }) => ({
              question: item.question.trim(),
              answer: item.answer.trim(),
            }))
            .filter((item: { question: string; answer: string }) => item.question && item.answer),
      divisionName,
      tourTypeName,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File));

    try {
      const res = await addTour(formData).unwrap();

      if (res.success) {
        toast.success("Tour created", { id: toastId });
        setImages([]);
        form.reset({
          title: "",
          description: "",
          departureLocation: "",
          arrivalLocation: "",
          minAge: "",
          division: "",
          tourType: "",
          included: [{ value: "" }],
          excluded: [{ value: "" }],
          amenities: [{ value: "" }],
          tourPlan: [{ value: "" }],
          faq: [{ question: "", answer: "" }],
          batches: [
            {
              costFrom: "",
              sellingPrice: "",
              startDate: new Date(),
              startTime: "",
              endDate: new Date(),
              endTime: "",
              regEndDate: new Date(),
              maxSeat: "",
            },
          ],
        });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error((err as IErrorResponse).message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Add Tour</h2>
      <p className="text-base font-medium text-gray-600 mb-5">
        Create a new tour for your customers
      </p>
      <Form {...form}>
        <form
          id="add-tour-form"
          className="space-y-5 mb-5"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="space-y-5 w-full bg-white px-8 pt-7 pb-9 rounded-xl tp-shadow">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3"><span className="w-8 h-8 rounded-lg bg-primary-100 flex justify-center items-center text-primary-500"><TbDatabaseEdit size={20} /></span> General Information</h3>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-600 text-sm">Tour Title<span className="text-destructive text-base">*</span></FormLabel>
                  <FormControl>
                    <Input className="tp-input" placeholder="e.g. Private Street Food Tour by Night" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-600 text-sm">Destinations<span className="text-destructive text-base">*</span></FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={divisionLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="tp-select">
                          <SelectValue placeholder="Select a destination" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {divisionOptions?.map(
                          (item: { label: string; value: string }) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tourType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-600 text-sm">Tour Type<span className="text-destructive text-base">*</span></FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="tp-select">
                          <SelectValue placeholder="Select a tour type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tourTypeOptions?.map(
                          (option: { value: string; label: string }) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="departureLocation"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold text-gray-600 text-sm">Departure Location<span className="text-destructive text-base">*</span></FormLabel>
                    <FormControl>
                      <Input className="tp-input" placeholder="Enter departure location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="arrivalLocation"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold text-gray-600 text-sm">Arrival Location<span className="text-destructive text-base">*</span></FormLabel>
                    <FormControl>
                      <Input className="tp-input" placeholder="Enter arrival location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-5 w-full bg-white px-8 pt-7 pb-9 rounded-xl tp-shadow">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3"><span className="w-8 h-8 rounded-lg bg-primary-100 flex justify-center items-center text-primary-500"><TbMoneybag size={20} /></span> Pricing and Batch</h3>

            <div className="space-y-4">
              {batchFields.map((batch, index) => (
                <div key={batch.id} className="border border-gray-200 rounded-xl p-5 bg-gray-50/70 space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-gray-800">Batch {index + 1}</h4>
                    {batchFields.length > 1 ? (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeBatch(index)}
                        className="!bg-red-600"
                      >
                        <Trash2 size={16} />
                      </Button>
                    ) : null}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`batches.${index}.costFrom`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-600 text-sm">Cost From<span className="text-destructive text-base">*</span> <span className="text-xs tracking-tight">(Per Person)</span></FormLabel>
                          <FormControl>
                            <Input className="tp-input" type="number" placeholder="Main price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`batches.${index}.sellingPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-600 text-sm">Selling Price<span className="text-destructive text-base">*</span> <span className="text-xs tracking-tight">(Per Person)</span></FormLabel>
                          <FormControl>
                            <Input className="tp-input" type="number" placeholder="Selling price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`batches.${index}.maxSeat`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-gray-600 text-sm">Max Seats<span className="text-destructive text-base">*</span></FormLabel>
                          <FormControl>
                            <Input className="tp-input" type="number" placeholder="e.g. 20" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`batches.${index}.startDate`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="font-semibold text-gray-600 text-sm">Tour Start Date<span className="text-destructive text-base">*</span></FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "tp-select w-full justify-between text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a start date</span>}
                                    <CalendarIcon className="h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setDate(new Date().getDate() - 1))
                                  }
                                  captionLayout="dropdown"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`batches.${index}.startTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-600 text-sm">Start Time<span className="text-destructive text-base">*</span></FormLabel>
                            <FormControl>
                              <TimePickerInput
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="hh : mm : aa"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`batches.${index}.endDate`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="font-semibold text-gray-600 text-sm">Tour End Date<span className="text-destructive text-base">*</span></FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "tp-select w-full justify-between text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Pick an end date</span>}
                                    <CalendarIcon className="h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setDate(new Date().getDate() - 1))
                                  }
                                  captionLayout="dropdown"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`batches.${index}.endTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-gray-600 text-sm">End Time<span className="text-destructive text-base">*</span></FormLabel>
                            <FormControl>
                              <TimePickerInput
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="hh : mm : aa"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`batches.${index}.regEndDate`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-semibold text-gray-600 text-sm">Registration Last Date<span className="text-destructive text-base">*</span></FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "tp-select w-full justify-between text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP") : <span>Pick registration date</span>}
                                  <CalendarIcon className="h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date(new Date().setDate(new Date().getDate() - 1))
                                }
                                captionLayout="dropdown"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="minAge"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="font-semibold text-gray-600 text-sm">Minimum Age<span className="text-destructive text-base">*</span></FormLabel>
                          <FormControl>
                            <Input className="tp-input" {...field} placeholder="e.g. 13" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="text-primary-500 border-primary-200 hover:border-primary-400"
                onClick={() =>
                  appendBatch({
                    costFrom: "",
                    sellingPrice: "",
                    maxSeat: "",
                    startDate: new Date(),
                    startTime: "",
                    endDate: new Date(),
                    endTime: "",
                    regEndDate: new Date(),
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" /> Add another batch
              </Button>
            </div>
          </div>

          <div className="space-y-5 w-full bg-white px-8 pt-7 pb-9 rounded-xl tp-shadow">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3"><span className="w-8 h-8 rounded-lg bg-primary-100 flex justify-center items-center text-primary-500"><TbFileDescription size={20} /></span> Description & Images</h3>
            <div className="grid md:grid-cols-2 gap-5 items-stretch">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold text-gray-600 text-sm">Description<span className="text-destructive text-base">*</span></FormLabel>
                    <FormControl>
                      <Textarea {...field} className="tp-textarea h-[205px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex-1 space-y-2">
                <p className="font-semibold text-gray-600 text-sm">Images<span className="text-destructive text-base">*</span> <span className="text-xs tracking-tight">(Up to 3 images)</span></p>
                <MultipleImageUploader onChange={setImages} />
              </div>
            </div>
          </div>

          <div className="space-y-5 w-full bg-white px-8 pt-7 pb-9 rounded-xl tp-shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Amenities</h3>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => appendAmenities({ value: "" })}
              >
                <Plus />
              </Button>
            </div>

            <div className="space-y-4">
              {amenitiesFields.map((item, index) => (
                <div className="flex gap-2" key={item.id}>
                  <FormField
                    control={form.control}
                    name={`amenities.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input className="tp-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    onClick={() => removeAmenities(index)}
                    variant="destructive"
                    className="!bg-red-600 h-11 px-6"
                    size="icon"
                    type="button"
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 w-full bg-white px-8 pt-7 pb-9 rounded-xl tp-shadow">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3"><span className="w-8 h-8 rounded-lg bg-primary-100 flex justify-center items-center text-primary-500"><MdOutlineJoinRight size={20} /></span> Included & Excluded</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Included</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => appendIncluded({ value: "" })}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  {includedFields.map((item, index) => (
                    <div className="flex gap-2" key={item.id}>
                      <FormField
                        control={form.control}
                        name={`included.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input className="tp-input" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        onClick={() => removeIncluded(index)}
                        variant="destructive"
                        className="!bg-red-600 h-11 px-6"
                        size="icon"
                        type="button"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Excluded</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => appendExcluded({ value: "" })}
                  >
                    <Plus />
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  {excludedFields.map((item, index) => (
                    <div className="flex gap-2" key={item.id}>
                      <FormField
                        control={form.control}
                        name={`excluded.${index}.value`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input className="tp-input" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        onClick={() => removeExcluded(index)}
                        variant="destructive"
                        className="!bg-red-600 h-11 px-6"
                        size="icon"
                        type="button"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 w-full bg-white px-8 pt-7 pb-9 rounded-xl tp-shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Tour Plan</h3>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => appendTourPlan({ value: "" })}
              >
                <Plus />
              </Button>
            </div>

            <div className="space-y-4">
              {tourPlanFields.map((item, index) => (
                <div className="flex gap-2" key={item.id}>
                  <FormField
                    control={form.control}
                    name={`tourPlan.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input className="tp-input" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    onClick={() => removeTourPlan(index)}
                    variant="destructive"
                    className="!bg-red-600 h-11 px-6"
                    size="icon"
                    type="button"
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 w-full bg-white px-8 pt-7 pb-9 rounded-xl tp-shadow">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3"><span className="w-8 h-8 rounded-lg bg-primary-100 flex justify-center items-center text-primary-500"><BsFillPatchQuestionFill size={20} /></span> FAQ</h3>

            <div className="space-y-4">
              {faqFields.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-gray-800">FAQ {index + 1}</h4>
                    {faqFields.length > 1 ? (
                      <Button
                        onClick={() => removeFaq(index)}
                        variant="destructive"
                        className="!bg-red-600"
                        size="icon"
                        type="button"
                      >
                        <Trash2 size={16} />
                      </Button>
                    ) : null}
                  </div>

                  <FormField
                    control={form.control}
                    name={`faq.${index}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-gray-600 text-sm">Question</FormLabel>
                        <FormControl>
                          <Input className="tp-input" placeholder="Enter FAQ question" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`faq.${index}.answer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-gray-600 text-sm">Answer</FormLabel>
                        <FormControl>
                          <Textarea className="tp-textarea min-h-[120px]" placeholder="Enter FAQ answer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="text-primary-500 border-primary-200 hover:border-primary-400"
                onClick={() => appendFaq({ question: "", answer: "" })}
              >
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="p-5 text-end bg-white fixed bottom-0 left-0 right-0 shadow-[0px_5px_25px_0px_#e4e4e4]">
        <Button className="tp-action-btn" type="submit" form="add-tour-form">
          Create Tour
        </Button>
      </div>
    </>
  );
}