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
} from "@aws-sdk/client-s3";
// import { randomUUID } from "crypto";
import { nanoid as randomUUID } from "nanoid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv"; // revisit
dotenv.config();
export const Bucket = process.env.BUCKET_NAME;
export const deleteObjects = (keys, Objects) => {
  const command = new DeleteObjectsCommand({
    Bucket,
    Delete: {
      Objects: Objects ? Objects : keys.map((Key) => ({ Key })),
    },
  });
  return getS3Client().send(command);
};
export const listObjectsInFolder = (Prefix) =>
  getS3Client().send(new ListObjectsV2Command({ Bucket, Prefix }));
export const completeMultipart = ({ ETags, UploadId, Key }) => {
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
export const getPutPartUrl = (options) =>
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
export const createMultipart = async (fileName, ACL = "private") => {
  let Key = randomUUID();
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
export const deleteObject = (Key, bucket) => {
  return getS3Client().send(
    new DeleteObjectCommand({
      Bucket: bucket || Bucket,
      Key,
    })
  );
};
const globalBucket = Bucket;
export const getReadURL = (Key, expiresIn = 900, options = {}) => {
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
export const fileExist = (Key) => {
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
export const getPutFileUrl = (Key, expiresIn = 900, config) => {
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
export const getDeleteFileUrl = async (Key) =>
  getSignedUrl(
    getS3Client(),
    new DeleteObjectCommand({
      Bucket,
      Key,
    }),
    { expiresIn: 3600 }
  );
const setCors = (options) => {
  const { MaxAgeSeconds = 3600, AllowedOrigins = ["*"] } = options || {};
  const input = {
    Bucket: process.env.BUCKET_NAME,
    CORSConfiguration: {
      CORSRules: [
        {
          MaxAgeSeconds,
          AllowedOrigins,
          AllowedHeaders: ["*"],
          ExposeHeaders: ["ETag"],
          AllowedMethods: ["PUT", "DELETE", "GET"],
        },
      ],
    },
  };
  const command = new PutBucketCorsCommand(input);
  return getS3Client().send(command);
};
let s3Client;
export function getS3Client() {
  s3Client ??= new S3Client({
    region: process.env.AWS_REGION || "auto",
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
  });
  return s3Client;
}
