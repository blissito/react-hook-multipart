import {
  COMPLETE_MULTIPART_STRING,
  CREATE_MULTIPART_STRING,
  CREATE_PUT_PART_URL_STRING,
} from "./multipart-uploader";
import retry from "async-retry";

export type UploadCompletedData = {
  uploadId: string;
  key: string;
  url: string;
  access: string;
  completedData: any;
  metadata: FileMetadata;
};
export type FileMetadata = {
  name: string;
  size: number;
  type: string;
};

export const MB = 1024 * 1024;
export const PART_SIZE = 8 * MB;

export const createMultipartUpload = async (
  handler: string = "/api/upload"
) => {
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify({
      intent: CREATE_MULTIPART_STRING,
    }),
    headers: {
      "content-type": "application/json",
    },
  };
  let response;
  try {
    response = await fetch(handler, init).then((res) => res.json());
  } catch (error: unknown) {
    throw error instanceof Error
      ? error
      : new Error("Error on post to handler");
  }
  return response;
};

const getPutPartUrl = async ({
  partNumber,
  uploadId,
  handler = "/api/upload",
  key,
}: {
  handler?: string;
  partNumber: number;
  uploadId: string;
  key: string;
}) => {
  return retry(
    async () => {
      const response = await fetch(handler, {
        method: "POST",
        body: JSON.stringify({
          partNumber,
          uploadId,
          key,
          intent: CREATE_PUT_PART_URL_STRING,
        }),
      });
      return await response.text();
    },
    { retries: 5 }
  );
};

const uploadOnePartRetry = async ({
  attempts = 5,
  url,
  blob,
}: {
  url: string;
  blob: Blob;
  attempts?: number;
}) => {
  let retryCount = 0;
  return await retry(
    async (bail: Function) => {
      const response = await fetch(url, {
        method: "PUT",
        body: blob,
      });
      // @todo abort and content-type?
      if (403 === response.status) {
        bail(new Error("Unauthorized"));
        return;
      } else if (response.ok) {
        return response;
      } else {
        throw new Error("Unknown error");
      }
    },
    {
      retries: attempts,
      onRetry: (error: unknown) => {
        retryCount = retryCount + 1;
        if (error instanceof Error) {
          console.log(`retrying #${retryCount} Put request of ${url}`);
        }
      },
    }
  );
};

export const uploadAllParts = async (options: {
  file: File;
  numberOfParts: number;
  uploadId: string;
  key: string;
  onUploadProgress?: (event: {
    total: number;
    loaded: number;
    percentage: number;
  }) => void;
  handler?: string;
}) => {
  const { file, numberOfParts, uploadId, key, onUploadProgress, handler } =
    options;
  let loaded = 0; // the magic is just a let 🪄✨🧷
  const uploadPromises = Array.from({ length: numberOfParts }).map(
    async (_, i: number) => {
      const url = await getPutPartUrl({
        partNumber: i + 1,
        uploadId,
        key,
        handler,
      });
      const start = i * PART_SIZE;
      const end = Math.min(start + PART_SIZE, file.size);
      const blob = file.slice(start, end); // directly from disk, no mainthread 🤩
      const response = await uploadOnePartRetry({ url, blob }); // trhow error after 5 retrys
      loaded += blob.size; // exact sum
      const percentage = (loaded / file.size) * 100;
      onUploadProgress?.({ total: file.size, loaded, percentage }); // on progress
      const str = response.headers.get("ETag");
      return String(str).replaceAll('"', ""); // cleaun up
    }
  );
  return (await Promise.all(uploadPromises)) as string[]; // [etag,etag]
};

export const completeMultipart = async (args: {
  key: string;
  uploadId: string;
  etags: string[];
  metadata: FileMetadata;
  handler?: string;
}) => {
  const { key, etags, uploadId, metadata, handler = "/api/upload" } = args;
  return await retry(async () => {
    const res = await fetch(handler, {
      method: "POST",
      body: JSON.stringify({
        intent: COMPLETE_MULTIPART_STRING,
        contentType: metadata.type,
        size: metadata.size,
        metadata,
        uploadId,
        etags,
        key,
      }),
    });
    return await res.json();
  }); // default retrys (10)
};
