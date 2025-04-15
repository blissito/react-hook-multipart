import {
  completeMultipart,
  createMultipartUpload,
  PART_SIZE,
  uploadAllParts,
  type FileMetadata,
  type UploadCompletedData,
} from "./client-utils";

// shared interface for multipartUpload
export interface UploadOptions {
  /**
   * Define your S3 secrets.
   * AWS_REGION = "auto";
   * AWS_ENDPOINT_URL_S3 = "https://fly.storage.tigris.dev";
   * BUCKET_NAME = "blissmo-bucket";
   * AWS_ACCESS_KEY_ID = "Tu access key";
   * AWS_SECRET_ACCESS_KEY = "Tu secret";
   * @defaultvalue process.env.EASYBITS_SECRET
   */
  easyBitsSecret?: string;
  /**
   * `AbortSignal` to cancel the running request. See https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
   */
  abortSignal?: AbortSignal;
  /**
   * Whether the file should be publicly accessible.
   * I'm following the ACL string values 'private' | 'public-read'
   */
  access: "public-read" | "private";
  /**
   * Adds a random uuid to the filename.
   * @defaultvalue true
   */
  addUuid?: boolean;
  /**
   * Defines the 'content-type' header when downloading a file.
   */
  contentType?: string;
  /**
   * Number in seconds to configure the edge and browser cache. The maximum values are 5 minutes for the edge cache and unlimited for the browser cache.
   *
   * @defaultvalue 365 * 24 * 60 * 60 (1 Year)
   */
  cacheControlMaxAge?: number;
}

type ProgressItems = {
  total: number;
  loaded: number;
  percentage: number;
};
type OnUploadProgressFunction = (event: ProgressItems) => void;

const noop = () => {};

// client
export const useUploadMultipart = (options?: {
  onUploadProgress?: OnUploadProgressFunction;
  handler?: string;
  access?: "public-read" | "private";
  multipart?: true;
}) => {
  const {
    access = "private",
    handler,
    onUploadProgress = noop,
    multipart,
  } = options || {};

  const upload = async (
    fileName: string,
    file: File,
    progressCb?: OnUploadProgressFunction,
    options?: { data: string }
  ) => {
    const { data } = options || {};
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
      data,
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
    upload: (
      fileName: string,
      file: File,
      progressCb?: OnUploadProgressFunction,
      options?: { data: string }
    ) => Promise<UploadCompletedData>;
  };
};
