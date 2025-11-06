import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypesQuery, useRemoveTourTypeMutation } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { AddTourTypeModal } from "./AddTourTypeModal";
import { toast } from "sonner";
import { GlobalDeleteConfirmation } from "@/components/shared/blocks/GlobalDeleteConfirmation";

export default function TourTypes() {
  const { data } = useGetTourTypesQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeTourType(tourId).unwrap();

      if (res.success) {
        toast.success("Removed", { id: toastId });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border bg-white rounded-lg shadow-[0px_2px_30px_-22px_#0000004d]">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="w-[100px] pl-5 font-bold bg-gray-100 rounded-tl-lg">Name</TableHead>
              <TableHead className="text-right pr-5 font-bold bg-gray-100 rounded-tr-lg">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { name: string, _id: string }, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium w-full pl-5">
                  {item?.name}
                </TableCell>
                <TableCell>
                  <GlobalDeleteConfirmation onConfirm={() => handleRemoveTourType(item?._id)}>
                    <span className="cursor-pointer text-red-500">
                      <Trash2 size={20} />
                    </span>
                  </GlobalDeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}