import {
  completeMultipart,
  createMultipartUpload,
  PART_SIZE,
  uploadAllParts,
  type FileMetadata,
  type UploadCompletedData,
} from "./clientUtils";

// client
export const useUploadMultipart = async (
  fileName: string,
  file: File,
  options: {
    onUploadProgress?: (event: {
      total: number;
      loaded: number;
      percentage: number;
    }) => void;
    handler?: string;
    access?: "public";
    multipart?: true;
  }
): Promise<UploadCompletedData> => {
  console.log("HELLO BLISSSMO from hook 🤓");
  const {
    access = "public", // @todo implement ACL
    handler,
    onUploadProgress,
    multipart,
  } = options || {};
  const metadata: FileMetadata = {
    name: fileName,
    size: file.size,
    type: file.type,
  };
  // @todo
  if (!multipart) {
  }
  const numberOfParts = Math.ceil(file.size / PART_SIZE);
  const { uploadId, key } = await createMultipartUpload(handler);
  const etags = await uploadAllParts({
    file,
    handler,
    key,
    numberOfParts,
    uploadId,
    onUploadProgress,
  });
  const completedData = await completeMultipart({
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
};
