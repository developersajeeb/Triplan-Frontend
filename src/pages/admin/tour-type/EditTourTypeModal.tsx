/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateTourTypeMutation } from "@/redux/features/tour/tour.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiLoaderLine } from "react-icons/ri";
import { toast } from "sonner";
import z from "zod";

interface TourTypeItem {
  _id: string;
  name: string;
  createdAt?: string;
}

interface Props {
  tourType: TourTypeItem;
  onClose: () => void;
}

const typeSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Tour type name is required." })
    .min(2, { message: "Tour type must be at least 2 characters long." })
    .max(100, { message: "Tour type cannot exceed 100 characters." }),
});

export function EditTourTypeModal({ tourType, onClose }: Props) {
  const [updateTourType] = useUpdateTourTypeMutation();
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: {
      name: tourType.name,
    },
  });

  useEffect(() => {
    form.reset({ name: tourType.name });
  }, [tourType, form]);

  const onSubmit = async (data: z.infer<typeof typeSchema>) => {
    setIsBtnLoading(true);
    try {
      const res = await updateTourType({
        id: tourType._id,
        body: { name: data.name },
      }).unwrap();
      if (res.success) {
        toast.success("Tour Type Updated Successfully");
        setIsBtnLoading(false);
        form.reset();
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update tour type.");
      setIsBtnLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Tour Type</DialogTitle>
          <DialogDescription className="sr-only">
            Please enter the tour type name and save to update it.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="mt-6 mb-4" id="edit-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-gray-800">
                    Tour Type Name<span className="text-destructive text-base">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="tp-input"
                      placeholder="Name"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            form="edit-tour-type"
            type="submit"
            className="tp-action-btn"
            disabled={isBtnLoading}
          >
            {isBtnLoading && <RiLoaderLine className="mr-2 animate-spin" />}
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
