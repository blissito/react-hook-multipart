// src/lib/utils.ts
import {
  S3Client,
  PutBucketCorsCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
var Bucket = process.env.BUCKET_NAME || "blissmo";
var completeMultipart = ({
  ETags,
  UploadId,
  Key
}) => {
  return S3.send(
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
var getPutPartUrl = async (options) => {
  const { Key, UploadId, partNumber, expiresIn = 60 * 15 } = options || {};
  await setCors();
  return getSignedUrl(
    S3,
    new UploadPartCommand({
      Bucket,
      Key,
      UploadId,
      PartNumber: partNumber
    }),
    {
      expiresIn
    }
  );
};
var createMultipart = async (directory) => {
  let Key = randomUUID();
  Key = directory ? directory + Key : Key;
  const { UploadId } = await S3.send(
    new CreateMultipartUploadCommand({
      Bucket,
      Key
    })
  );
  if (!UploadId)
    throw new Error("Error trying to create a multipart upload \u{1F6A8}");
  return {
    uploadId: UploadId,
    key: Key
  };
};
var deleteObject = (Key) => S3.send(
  new DeleteObjectCommand({
    Bucket,
    Key
  })
);
var getReadURL = async (Key, expiresIn = 3600) => {
  await setCors();
  return getSignedUrl(
    S3,
    new GetObjectCommand({
      Bucket,
      Key
    }),
    { expiresIn }
  );
};
var fileExist = async (Key) => {
  return await S3.send(
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
var setCors = (options) => {
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
          // important for multipart
          AllowedMethods: ["PUT", "DELETE", "GET"]
        }
      ]
    }
  };
  const command = new PutBucketCorsCommand(input);
  return S3.send(command);
};
var S3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3
});

// src/lib/constants.ts
var CREATE_MULTIPART_STRING = "create_multipart_upload";
var CREATE_PUT_PART_URL_STRING = "create_put_part_url";
var COMPLETE_MULTIPART_STRING = "complete_multipart_upload";

// src/lib/multipart-uploader.ts
var handler = async (request, cb) => {
  const body = await request.json();
  switch (body.intent) {
    case CREATE_MULTIPART_STRING:
      return new Response(
        JSON.stringify(await createMultipart(body.directory))
      );
    case CREATE_PUT_PART_URL_STRING:
      return new Response(
        await getPutPartUrl({
          Key: body.key,
          UploadId: body.uploadId,
          partNumber: body.partNumber
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
      return typeof cb === "function" ? cb(complete) : new Response(JSON.stringify(complete));
    default:
      return new Response(null);
  }
};
export {
  deleteObject,
  fileExist,
  getReadURL,
  handler
};
