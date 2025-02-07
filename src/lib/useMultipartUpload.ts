import {
  completeMultipart,
  createMultipartUpload,
  PART_SIZE,
  uploadAllParts,
  type FileMetadata,
  type UploadCompletedData,
} from "./client-utils";

type OnUploadProgress = (event: {
  total: number;
  loaded: number;
  percentage: number;
}) => void;
// client
export const useUploadMultipart = (options?: {
  onUploadProgress?: OnUploadProgress;
  handler?: string;
  access?: "public-read" | "private";
  multipart?: true;
}) => {
  const {
    access = "public-read", // public by default
    handler,
    onUploadProgress,
    multipart,
  } = options || {};

  const upload = async (
    fileName: string,
    file: File,
    progressCb: OnUploadProgress
  ) => {
    const metadata: FileMetadata = {
      name: file.name,
      size: file.size,
      type: file.type,
    };
    // @todo
    if (!multipart) {
    }
    const numberOfParts = Math.ceil(file.size / PART_SIZE);
    const { uploadId, key } = await createMultipartUpload(
      handler,
      fileName,
      access
    );
    const etags = await uploadAllParts({
      file,
      handler,
      key,
      numberOfParts,
      uploadId,
      onUploadProgress: progressCb || onUploadProgress,
    });
    const completedData = await completeMultipart({
      access, // just to pass it trhough
      metadata,
      key,
      uploadId,
      etags,
      handler,
    });
    return {
      uploadId,
      key,
      metadata,
      url: "", // @todo with ACL public
      access,
      completedData,
    };
  }; // upload
  return { upload } as {
    upload: (arg0: string, arg1: File) => Promise<UploadCompletedData>;
  };
};
