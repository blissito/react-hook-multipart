import {
  S3Client,
  PutBucketCorsCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv"; // revisit
dotenv.config();

export const Bucket = process.env.BUCKET_NAME;
console.info("BUCKET_NAME", Bucket);

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
}) =>
  getSignedUrl(
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

export const createMultipart = async (
  fileName?: string,
  ACL: "public-read" | "private" = "private"
) => {
  let Key: `${string}-${string}-${string}-${string}-${string}` | string =
    randomUUID();
  if (fileName) {
    const name = fileName.split(".");
    const ext = name.pop();
    Key = name.join(".") + "_" + Key + "." + ext; // @todo revisit
  }
  // await setCors();
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

export const deleteObject = (Key: string) =>
  getS3Client().send(
    new DeleteObjectCommand({
      Bucket,
      Key,
    })
  );

const globalBucket = Bucket;
export const getReadURL = (
  Key: string,
  expiresIn = 900,
  options: { Bucket?: string }
) => {
  const { Bucket = globalBucket } = options || {};
  getSignedUrl(
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

export const getPutFileUrl = (Key: string, expiresIn: number = 900) =>
  getSignedUrl(
    getS3Client(),
    new PutObjectCommand({
      Bucket,
      Key,
    }),
    { expiresIn }
  );

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
