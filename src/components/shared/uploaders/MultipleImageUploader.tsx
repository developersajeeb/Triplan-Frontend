import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, type Dispatch } from "react";
import { useFileUpload, type FileMetadata } from "@/hooks/use-file-upload";

export default function MultipleImageUploader({
  onChange,
  defaultImageUrls = [],
  onRemoveDefaultImage,
}: {
  onChange: Dispatch<React.SetStateAction<[] | (File | FileMetadata)[]>>;
  defaultImageUrls?: string[];
  onRemoveDefaultImage?: (url: string) => void;
}) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 3;

  const [
    { files: selectedFiles, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/webp",
    maxSize,
    multiple: true,
    maxFiles,
  });

  const hasAnyImages = defaultImageUrls.length > 0 || selectedFiles.length > 0;
  const totalUploaded = defaultImageUrls.length + selectedFiles.length;

  useEffect(() => {
    if (selectedFiles.length > 0) {
      const imageList = selectedFiles.map((item) => item.file);
      onChange(imageList);
    } else {
      onChange([]);
    }
  }, [selectedFiles, onChange]);

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={hasAnyImages || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-lg border border-gray-300 p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
        {hasAnyImages ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">
                Uploaded Files ({totalUploaded})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                disabled={totalUploaded >= maxFiles}
                type="button"
              >
                <UploadIcon
                  className="-ms-0.5 size-3.5 opacity-60"
                  aria-hidden="true"
                />
                Add more
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {defaultImageUrls.map((url, index) => (
                <div
                  key={`default-${url}-${index}`}
                  className="bg-accent relative aspect-square rounded-md"
                >
                  <img
                    src={url}
                    alt={`Default image ${index + 1}`}
                    className="size-full rounded-[inherit] object-cover"
                  />
                  {onRemoveDefaultImage ? (
                    <Button
                      onClick={() => onRemoveDefaultImage(url)}
                      size="icon"
                      className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                      aria-label={`Remove default image ${index + 1}`}
                      type="button"
                    >
                      <XIcon className="size-3.5" />
                    </Button>
                  ) : null}
                </div>
              ))}

              {selectedFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-accent relative aspect-square rounded-md"
                >
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="size-full rounded-[inherit] object-cover"
                  />
                  <Button
                    onClick={() => removeFile(file.id)}
                    size="icon"
                    className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                    aria-label="Remove image"
                    type="button"
                  >
                    <XIcon className="size-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
            <p className="text-muted-foreground text-xs">
              SVG, PNG, JPG or WEBP (max. {maxSizeMB}MB)
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={openFileDialog}
            >
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              Select images
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}