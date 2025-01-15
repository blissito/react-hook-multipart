import type { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";
import { completeMultipart, createMultipart, getPutPartUrl } from "./utils";

export const CREATE_STRING = "create_multipart_upload";
export const CREATE_PUT_PART_URL_STRING = "create_put_part_url";
export const COMPLETE_MULTIPART_STRING = "complete_multipart_upload";

// server
export const handler = async (
  request: Request,
  cb?: (arg0: CompleteMultipartUploadCommandOutput) => any
) => {
  console.log("Hello Blissmo, from package 🤓");
  // @todo auth?
  const body = await request.json();
  switch (body.intent) {
    case CREATE_STRING:
      return new Response(JSON.stringify(await createMultipart()));
    case CREATE_PUT_PART_URL_STRING:
      return new Response(
        await getPutPartUrl({
          Key: body.key,
          UploadId: body.uploadId,
          partNumber: body.partNumber,
        })
      );
    case COMPLETE_MULTIPART_STRING:
      const completedData = await completeMultipart({
        ETags: body.etags,
        Key: body.key,
        UploadId: body.uploadId,
      });
      // DB stuff
      return typeof cb === "function"
        ? cb(completedData)
        : new Response(JSON.stringify(completedData));
    default:
      return null;
  }
};
