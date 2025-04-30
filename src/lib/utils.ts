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
  ListObjectsV2Command,
  // PutObjectAclCommand,
} from "@aws-sdk/client-s3";
// import { randomUUID } from "crypto";
import { nanoid as randomUUID } from "nanoid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv"; // revisit
dotenv.config();

export const Bucket = process.env.BUCKET_NAME;

export const deleteObjects = (keys: string[], Objects?: { Key: string }[]) => {
  const command = new DeleteObjectsCommand({
    Bucket,
    Delete: {
      Objects: Objects ? Objects : keys.map((Key) => ({ Key })),
    },
  });
  return getS3Client().send(command);
};

export const listObjectsInFolder = (Prefix: string) =>
  getS3Client().send(new ListObjectsV2Command({ Bucket, Prefix }));

export const completeMultipart = ({
  ETags,
  UploadId,
  Key,
}: {
  Key: string;
  ETags: string[];
  UploadId: string;
}) => {
  return getS3Client().send(
    new CompleteMultipartUploadCommand({
      Bucket,
      Key,
      UploadId,
      MultipartUpload: {
        Parts: ETags.map((ETag, i) => ({
          ETag,
          PartNumber: i + 1,
        })),
      },
    })
  );
};

export const getPutPartUrl = (options: {
  client?: S3Client;
  Key: string;
  UploadId: string;
  PartNumber: number;
  expiresIn?: number; // defaults to 15m
  signal?: AbortSignal;
}) => {
  setAbortListener(options.signal);
  return getSignedUrl(
    getS3Client(),
    new UploadPartCommand({
      Bucket,
      Key: options.Key,
      UploadId: options.UploadId,
      PartNumber: options.PartNumber,
    }),
    {
      expiresIn: options.expiresIn,
    }
  );
};

export const createMultipart = async (
  fileName?: string,
  ACL: "public-read" | "private" = "private",
  signal?: AbortSignal
) => {
  let Key: `${string}-${string}-${string}-${string}-${string}` | string =
    randomUUID();
  if (fileName) {
    const name = fileName.split(".");
    const ext = name.pop();
    Key = name.join(".") + "_" + Key + "." + ext; // @todo revisit
  }
  setAbortListener(signal); // experimental...
  const { UploadId } = await getS3Client().send(
    new CreateMultipartUploadCommand({
      Bucket,
      Key,
      ACL,
    })
  );
  if (!UploadId)
    throw new Error("Error trying to create a multipart upload 🚨");

  return {
    uploadId: UploadId,
    key: Key,
  };
};

export const deleteObject = (Key: string, bucket?: string) => {
  return getS3Client().send(
    new DeleteObjectCommand({
      Bucket: bucket || Bucket,
      Key,
    })
  );
};

const globalBucket = Bucket;
export const getReadURL = (
  Key: string,
  expiresIn = 900,
  options: { Bucket?: string } = {}
) => {
  const { Bucket = globalBucket } = options;
  return getSignedUrl(
    getS3Client(),
    new GetObjectCommand({
      Key,
      Bucket,
    }),
    { expiresIn } // seconds
  );
};

export const fileExist = (Key: string) => {
  return getS3Client()
    .send(
      new HeadObjectCommand({
        Bucket,
        Key,
      })
    )
    .then((r) => {
      console.log("::FILE_EXIST:: ", r.ContentType);
      return true;
    })
    .catch((err) => {
      console.error("FILE_MAY_NOT_EXIST", Key, err.message);
      return false;
    });
};

export const getPutFileUrl = (
  Key: string,
  expiresIn: number = 900,
  config: {
    ACL?: "public-read" | "private";
    Bucket?: string;
  }
) => {
  const { ACL = "private", Bucket: B } = config || {};
  return getSignedUrl(
    getS3Client(),
    new PutObjectCommand({
      Bucket: B || Bucket,
      Key,
      ACL,
    }),
    { expiresIn }
  );
};

export const getDeleteFileUrl = async (Key: string) =>
  getSignedUrl(
    getS3Client(),
    new DeleteObjectCommand({
      Bucket,
      Key,
    }),
    { expiresIn: 3600 }
  );

const setCors = (options?: {
  MaxAgeSeconds?: number;
  AllowedOrigins?: string[];
}) => {
  const { MaxAgeSeconds = 3600, AllowedOrigins = ["*"] } = options || {};
  const input = {
    Bucket: process.env.BUCKET_NAME,
    CORSConfiguration: {
      CORSRules: [
        {
          MaxAgeSeconds,
          AllowedOrigins,
          AllowedHeaders: ["*"],
          ExposeHeaders: ["ETag"], // important for multipart
          AllowedMethods: ["PUT", "DELETE", "GET"],
        },
      ],
    },
  };
  const command = new PutBucketCorsCommand(input);
  return getS3Client().send(command);
};

let s3Client: S3Client;

export function getS3Client() {
  s3Client ??= new S3Client({
    region: process.env.AWS_REGION || "auto",
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
  });
  return s3Client;
}

// LEARNING WILL DELETE SOON
const setAbortListener = (signal?: AbortSignal) => {
  signal?.addEventListener(
    "abort",
    () => {
      throwIfAborted(signal);
      // @todo cancel upload?
      // @todo update state?
      // @todo update cache?
    },
    { once: true }
  );
};

const throwIfAborted = (signal?: AbortSignal | null) => {
  if (signal?.aborted) {
    console.info("::ABORT::REASON::", signal.reason);
    console.error("Aborted by signal ‼️");
    throw new Error("Upload aborted 🚭");
  }
};

// This can't be arrow function (this) 🤓
function abortOn(
  this: {
    abort: (reason: string) => void;
    then?: Promise<any>["then"];
  },
  signal?: AbortSignal
) {
  if (signal) {
    const abortPromise = () => this.abort(signal.reason);
    signal.addEventListener("abort", abortPromise);
    const removeAbortListener = () => {
      signal.removeEventListener("abort", abortPromise);
    };
    this.then?.(removeAbortListener, removeAbortListener);
  }

  return this;
}
