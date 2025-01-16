// src/lib/client-utils.ts
import retry from "async-retry";

// src/lib/constants.ts
var CREATE_MULTIPART_STRING = "create_multipart_upload";
var CREATE_PUT_PART_URL_STRING = "create_put_part_url";
var COMPLETE_MULTIPART_STRING = "complete_multipart_upload";

// src/lib/client-utils.ts
var MB = 1024 * 1024;
var PART_SIZE = 8 * MB;
var createMultipartUpload = async (handler = "/api/upload", directory) => {
  const init = {
    method: "POST",
    body: JSON.stringify({
      intent: CREATE_MULTIPART_STRING,
      directory
    }),
    headers: {
      "content-type": "application/json"
    }
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
  attempts = 2,
  url,
  blob
}) => {
  let retryCount = 0;
  return await retry(
    async (bail) => {
      const response = await fetch(url, {
        method: "PUT",
        body: blob
      });
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
  const { file, numberOfParts, uploadId, key, onUploadProgress, handler } = options;
  let loaded = 0;
  const uploadPromises = Array.from({ length: numberOfParts }).map(
    async (_, i) => {
      const url = await getPutPartUrl({
        partNumber: i + 1,
        uploadId,
        key,
        handler
      });
      const start = i * PART_SIZE;
      const end = Math.min(start + PART_SIZE, file.size);
      const blob = file.slice(start, end);
      const response = await uploadOnePartRetry({ url, blob });
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
        key
      })
    });
    return await res.json();
  });
};

// src/lib/useMultipartUpload.ts
var useUploadMultipart = (options) => {
  const {
    access = "public",
    // @todo implement ACL
    handler,
    onUploadProgress,
    multipart
  } = options || {};
  const upload = async (directory, file) => {
    const metadata = {
      name: file.name,
      size: file.size,
      type: file.type
    };
    if (!multipart) {
    }
    const numberOfParts = Math.ceil(file.size / PART_SIZE);
    const { uploadId, key } = await createMultipartUpload(handler, directory);
    const etags = await uploadAllParts({
      file,
      handler,
      key,
      numberOfParts,
      uploadId,
      onUploadProgress
    });
    const completedData = await completeMultipart({
      metadata,
      key,
      uploadId,
      etags,
      handler
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
