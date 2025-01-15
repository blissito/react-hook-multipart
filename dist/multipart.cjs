"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/multipart.ts
var multipart_exports = {};
__export(multipart_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(multipart_exports);

// src/lib/utils.ts
var import_client_s3 = require("@aws-sdk/client-s3");
var import_crypto = require("crypto");
var import_s3_request_presigner = require("@aws-sdk/s3-request-presigner");
var Bucket = process.env.BUCKET_NAME || "blissmo";
var completeMultipart = ({
  ETags,
  UploadId,
  Key
}) => {
  return S3.send(
    new import_client_s3.CompleteMultipartUploadCommand({
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
  return (0, import_s3_request_presigner.getSignedUrl)(
    S3,
    new import_client_s3.UploadPartCommand({
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
var createMultipart = async (Key) => {
  if (!Key) {
    Key = (0, import_crypto.randomUUID)();
  }
  const { UploadId } = await S3.send(
    new import_client_s3.CreateMultipartUploadCommand({
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
var setCors = async (options) => {
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
  const command = new import_client_s3.PutBucketCorsCommand(input);
  return await S3.send(command);
};
var S3 = new import_client_s3.S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3
});

// src/lib/constants.ts
var CREATE_MULTIPART_STRING = "create_multipart_upload";
var CREATE_PUT_PART_URL_STRING = "create_put_part_url";
var COMPLETE_MULTIPART_STRING = "complete_multipart_upload";

// src/lib/multipart-uploader.ts
var handler = async (request, cb) => {
  console.log("Hello Blissmo, from package \u{1F913}");
  const body = await request.json();
  switch (body.intent) {
    case CREATE_MULTIPART_STRING:
      return new Response(JSON.stringify(await createMultipart()));
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
      return typeof cb === "function" ? cb(completedData) : new Response(JSON.stringify(completedData));
    default:
      return null;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
