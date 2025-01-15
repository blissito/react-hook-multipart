import {
  //   DeleteObjectCommand, // @todo
  //   HeadObjectCommand,
  S3Client,
  PutBucketCorsCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const Bucket = process.env.BUCKET_NAME || "blissmo";

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
  Key: string;
  UploadId: string;
  partNumber: number;
  expiresIn?: number; // defaults to 15m
}) => {
  const { Key, UploadId, partNumber, expiresIn = 60 * 15 } = options || {};
  await setCors();
  return getSignedUrl(
    S3,
    new UploadPartCommand({
      Bucket,
      Key,
      UploadId,
      PartNumber: partNumber,
    }),
    {
      expiresIn,
    }
  );
};

export const createMultipart = async (Key?: string) => {
  if (!Key) {
    Key = randomUUID();
  }

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

const S3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
});

const setCors = async (options?: {
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
  return await S3.send(command);
};
