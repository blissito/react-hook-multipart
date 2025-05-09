import {
  COMPLETE_MULTIPART_STRING,
  CREATE_MULTIPART_STRING,
  CREATE_PUT_PART_URL_STRING
} from "./chunk-VHLUS35K.js";

// src/lib/client-utils.ts
import retry from "async-retry";
var MB = 1024 * 1024;
var PART_SIZE = 8 * MB;
var createMultipartUpload = async (handler = "/api/upload", fileName, access = "public-read", options) => {
  const init = {
    method: "POST",
    body: JSON.stringify({
      intent: CREATE_MULTIPART_STRING,
      fileName,
      access
    }),
    headers: {
      "content-type": "application/json"
    },
    signal: options?.abortSignal
  };
  let response;
  try {
    response = await fetch(handler, init).then((res) => res.json());
  } catch (error) {
    throw error instanceof Error ? error : new Error("Error on post to handler");
  }
  return response;
};
var getPutPartUrl = async ({
  partNumber,
  uploadId,
  handler = "/api/upload",
  key
}) => {
  return retry(
    async () => {
      const response = await fetch(handler, {
        method: "POST",
        body: JSON.stringify({
          partNumber,
          uploadId,
          key,
          intent: CREATE_PUT_PART_URL_STRING
        })
      });
      return await response.text();
    },
    { retries: 5 }
  );
};
var uploadOnePartRetry = async ({
  attempts = 1,
  url,
  blob,
  options,
  signal
}) => {
  let retryCount = 0;
  return await retry(
    async (bail) => {
      const response = await fetch(url, {
        method: "PUT",
        body: blob,
        signal
      });
      if (403 === response.status) {
        bail(new Error("Unauthorized"));
        return;
      } else if (response.ok && response.headers.has("ETag")) {
        return response;
      } else {
        throw new Error(
          "Unknown error, has ETAG:" + response.headers.has("ETag") + " Value:" + response.headers.get("ETag")
        );
      }
    },
    {
      retries: attempts,
      onRetry: (error) => {
        retryCount = retryCount + 1;
        if (error instanceof Error) {
          console.log(`retrying #${retryCount} Put request of ${url}`);
        }
      }
    }
  );
};
var uploadAllParts = async (options) => {
  const {
    signal,
    file,
    numberOfParts,
    uploadId,
    key,
    onUploadProgress,
    handler
  } = options;
  let loaded = 0;
  const uploadPromises = Array.from({ length: numberOfParts }).map(
    async (_, i) => {
      const url = await getPutPartUrl({
        partNumber: i + 1,
        uploadId,
        key,
        handler
        // signal,
      });
      const start = i * PART_SIZE;
      const end = Math.min(start + PART_SIZE, file.size);
      const blob = file.slice(start, end);
      const response = await uploadOnePartRetry({
        url,
        blob,
        signal
      });
      loaded += blob.size;
      const percentage = loaded / file.size * 100;
      onUploadProgress?.({ total: file.size, loaded, percentage });
      const str = response.headers.get("ETag");
      return String(str).replaceAll('"', "");
    }
  );
  return await Promise.all(uploadPromises);
};
var completeMultipart = async (args) => {
  const {
    key,
    data,
    etags,
    signal,
    access,
    uploadId,
    metadata,
    handler = "/api/upload"
  } = args;
  return await retry(async () => {
    const res = await fetch(handler, {
      signal,
      method: "POST",
      body: JSON.stringify({
        intent: COMPLETE_MULTIPART_STRING,
        contentType: metadata.type,
        size: metadata.size,
        metadata,
        uploadId,
        access,
        etags,
        data,
        key
      })
    });
    return await res.json();
  });
};

// src/lib/useMultipartUpload.ts
var noop = () => {
};
var useUploadMultipart = (options) => {
  const {
    signal,
    access = "private",
    handler,
    onUploadProgress = noop,
    multipart
  } = options || {};
  const upload = async (fileName, file, progressCb, options2) => {
    const { data } = options2 || {};
    const metadata = {
      name: file.name,
      size: file.size,
      type: file.type
    };
    if (!multipart) {
    }
    const numberOfParts = Math.ceil(file.size / PART_SIZE);
    const { uploadId, key } = await createMultipartUpload(
      handler,
      fileName,
      access,
      { abortSignal: signal }
      // @todo signal?
    );
    const etags = await uploadAllParts({
      file,
      handler,
      key,
      numberOfParts,
      uploadId,
      onUploadProgress: progressCb || onUploadProgress,
      signal
      // experimenting...
    });
    const completedData = await completeMultipart({
      access,
      // just to pass it trhough
      metadata,
      key,
      uploadId,
      etags,
      handler,
      data
    });
    return {
      uploadId,
      key,
      metadata,
      url: "",
      // @todo with ACL public
      access,
      completedData
    };
  };
  return { upload };
};
export {
  useUploadMultipart
};
