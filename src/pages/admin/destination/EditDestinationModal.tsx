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
import { Textarea } from "@/components/ui/textarea";
import { useUpdateDivisionMutation } from "@/redux/features/destination/destination.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiLoaderLine } from "react-icons/ri";
import { toast } from "sonner";
import z from "zod";
import SingleImageUploader from "@/components/shared/uploaders/SingleImageUploader";

interface DestinationItem {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
}

interface Props {
  destination: DestinationItem;
  onClose: () => void;
}

const destinationSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Destination name is required." })
    .min(2, { message: "Destination must be at least 2 characters long." })
    .max(100, { message: "Destination cannot exceed 100 characters." }),
  description: z
    .string()
    .nonempty({ message: "Description is required." })
    .min(5, { message: "Description must be at least 5 characters long." })
    .max(500, { message: "Description cannot exceed 500 characters." }),
});

export function EditDestinationModal({ destination, onClose }: Props) {
  const [updateDivision] = useUpdateDivisionMutation();
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof destinationSchema>>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: destination.name,
      description: destination.description || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: destination.name,
      description: destination.description || "",
    });
    setImage(null);
  }, [destination, form]);

  const onSubmit = async (data: z.infer<typeof destinationSchema>) => {
    setIsBtnLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);

      if (image) {
        formData.append("file", image);
      }

      const res = await updateDivision({
        id: destination._id,
        body: formData,
      }).unwrap();

      if (res.success) {
        toast.success("Destination updated successfully");
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update destination.");
    } finally {
      setIsBtnLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Destination</DialogTitle>
          <DialogDescription className="sr-only">
            Please edit destination fields and save.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="mt-4 mb-2 space-y-3" id="edit-destination" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-gray-800">
                    Destination Name<span className="text-destructive text-base">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input className="tp-input" placeholder="Name" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-gray-800">
                    Description<span className="text-destructive text-base">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="tp-textarea min-h-20" placeholder="Description here" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel className="text-gray-800">Image</FormLabel>
              <SingleImageUploader
                onChange={setImage}
                defaultImageUrl={destination.thumbnail || null}
              />
            </div>
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button form="edit-destination" type="submit" className="tp-action-btn" disabled={isBtnLoading}>
            {isBtnLoading && <RiLoaderLine className="mr-2 animate-spin" />}
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
