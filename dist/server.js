import {
  COMPLETE_MULTIPART_STRING,
  CREATE_MULTIPART_STRING,
  CREATE_PUT_PART_URL_STRING
} from "./chunk-VHLUS35K.js";

// src/lib/utils.ts
import {
  S3Client,
  PutBucketCorsCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command
} from "@aws-sdk/client-s3";
import { nanoid as randomUUID } from "nanoid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();
var Bucket = process.env.BUCKET_NAME;
var deleteObjects = (keys, Objects) => {
  const command = new DeleteObjectsCommand({
    Bucket,
    Delete: {
      Objects: Objects ? Objects : keys.map((Key) => ({ Key }))
    }
  });
  return getS3Client().send(command);
};
var listObjectsInFolder = (Prefix) => getS3Client().send(new ListObjectsV2Command({ Bucket, Prefix }));
var completeMultipart = ({
  ETags,
  UploadId,
  Key
}) => {
  return getS3Client().send(
    new CompleteMultipartUploadCommand({
      Bucket,
      Key,
      UploadId,
      MultipartUpload: {
        Parts: ETags.map((ETag, i) => ({
          ETag,
          PartNumber: i + 1
        }))
      }
    })
  );
};
var getPutPartUrl = (options) => getSignedUrl(
  getS3Client(),
  new UploadPartCommand({
    Bucket,
    Key: options.Key,
    UploadId: options.UploadId,
    PartNumber: options.PartNumber
  }),
  {
    expiresIn: options.expiresIn
  }
);
var createMultipart = async (fileName, ACL = "private", signal) => {
  let Key = randomUUID();
  if (fileName) {
    const name = fileName.split(".");
    const ext = name.pop();
    Key = name.join(".") + "_" + Key + "." + ext;
  }
  setAbortListener(signal);
  const { UploadId } = await getS3Client().send(
    new CreateMultipartUploadCommand({
      Bucket,
      Key,
      ACL
    })
  );
  if (!UploadId)
    throw new Error("Error trying to create a multipart upload \u{1F6A8}");
  return {
    uploadId: UploadId,
    key: Key
  };
};
var deleteObject = (Key, bucket) => {
  return getS3Client().send(
    new DeleteObjectCommand({
      Bucket: bucket || Bucket,
      Key
    })
  );
};
var globalBucket = Bucket;
var getReadURL = (Key, expiresIn = 900, options = {}) => {
  const { Bucket: Bucket2 = globalBucket } = options;
  return getSignedUrl(
    getS3Client(),
    new GetObjectCommand({
      Key,
      Bucket: Bucket2
    }),
    { expiresIn }
    // seconds
  );
};
var fileExist = (Key) => {
  return getS3Client().send(
    new HeadObjectCommand({
      Bucket,
      Key
    })
  ).then((r) => {
    console.log("::FILE_EXIST:: ", r.ContentType);
    return true;
  }).catch((err) => {
    console.error("FILE_MAY_NOT_EXIST", Key, err.message);
    return false;
  });
};
var getPutFileUrl = (Key, expiresIn = 900, config) => {
  const { ACL = "private", Bucket: B } = config || {};
  return getSignedUrl(
    getS3Client(),
    new PutObjectCommand({
      Bucket: B || Bucket,
      Key,
      ACL
    }),
    { expiresIn }
  );
};
var getDeleteFileUrl = async (Key) => getSignedUrl(
  getS3Client(),
  new DeleteObjectCommand({
    Bucket,
    Key
  }),
  { expiresIn: 3600 }
);
var s3Client;
function getS3Client() {
  s3Client ??= new S3Client({
    region: process.env.AWS_REGION || "auto",
    endpoint: process.env.AWS_ENDPOINT_URL_S3
  });
  return s3Client;
}
var setAbortListener = (signal) => {
  signal?.addEventListener(
    "abort",
    () => {
      throwIfAborted(signal);
    },
    { once: true }
  );
};
var throwIfAborted = (signal) => {
  if (signal?.aborted) {
    console.info("::ABORT::REASON::", signal.reason);
    throw new Error("Upload aborted \u{1F6AD}");
  }
};

// src/lib/multipart-uploader.ts
var handler = async (request, cb, options) => {
  const { ACL = "private", directory = "" } = options || {};
  const body = await request.json();
  switch (body.intent) {
    case CREATE_MULTIPART_STRING:
      const path = directory + body.fileName;
      return new Response(
        JSON.stringify(await createMultipart(path, body.access || ACL))
      );
    case CREATE_PUT_PART_URL_STRING:
      return new Response(
        await getPutPartUrl({
          Key: body.key,
          UploadId: body.uploadId,
          PartNumber: body.partNumber
        })
      );
    case COMPLETE_MULTIPART_STRING:
      const completedData = await completeMultipart({
        ETags: body.etags,
        Key: body.key,
        UploadId: body.uploadId
      });
      const complete = {
        ...body,
        completedData,
        intent: void 0
      };
      console.info("::MULTIPART_COMPLETED:: ", complete.key);
      return typeof cb === "function" ? cb(complete) : new Response(JSON.stringify(complete));
    default:
      return new Response(null);
  }
};
export {
  deleteObject,
  deleteObjects,
  fileExist,
  getDeleteFileUrl,
  getPutFileUrl,
  getReadURL,
  getS3Client,
  handler,
  listObjectsInFolder
};
