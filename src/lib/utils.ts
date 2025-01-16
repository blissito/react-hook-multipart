import {
  S3Client,
  PutBucketCorsCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const Bucket = process.env.BUCKET_NAME;

export const completeMultipart = ({
  ETags,
  UploadId,
  Key,
}: {
  Key: string;
  ETags: string[];
  UploadId: string;
}) => {
  return S3.send(
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

export const getPutPartUrl = async (options: {
  client?: S3Client;
  Key: string;
  UploadId: string;
  PartNumber: number;
  expiresIn?: number; // defaults to 15m
}) => {
  const { Key, UploadId, PartNumber, expiresIn = 60 * 15 } = options || {};
  // await setCors();
  const url = await getSignedUrl(
    S3,
    new UploadPartCommand({
      Bucket,
      Key,
      UploadId,
      PartNumber,
    }),
    {
      expiresIn,
    }
  );
  console.log("type:", typeof url);
  if (url.includes("UNSIGNED-PAYLOAD")) throw new Error("UNISGNED-PAYLOAD");
  return url;
};

export const createMultipart = async (directory?: string) => {
  let Key: `${string}-${string}-${string}-${string}-${string}` | string =
    randomUUID();
  Key = directory ? directory + Key : Key;
  const { UploadId } = await S3.send(
    new CreateMultipartUploadCommand({
      Bucket,
      Key,
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
  S3.send(
    new DeleteObjectCommand({
      Bucket,
      Key,
    })
  );

export const getReadURL = async (Key: string, expiresIn = 3600) => {
  return getSignedUrl(
    S3,
    new GetObjectCommand({
      Bucket,
      Key,
    }),
    { expiresIn }
  );
};

export const fileExist = async (Key: string) => {
  return await S3.send(
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
  return S3.send(command);
};

const S3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
});
