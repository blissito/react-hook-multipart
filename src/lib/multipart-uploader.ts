import { completeMultipart, createMultipart, getPutPartUrl } from "./utils";
import {
  COMPLETE_MULTIPART_STRING,
  CREATE_MULTIPART_STRING,
  CREATE_PUT_PART_URL_STRING,
} from "./constants";

export type Complete = {
  contentType: string;
  size: number;
  metadata: { name: string; size: number; type: string };
  uploadId: string;
  etags: string[];
  key: string;
  completedData: {
    $metadata: {
      httpStatusCode: number;
      requestId: string;
      extendedRequestId: any;
      cfId: any;
      attempts: number;
      totalRetryDelay: number;
    };
    Bucket: string;
    ETag: string;
    Key: string;
  };
};

// server
export const handler = async (
  request: Request,
  cb?: (arg0: Complete) => Promise<Response>
) => {
  // @todo auth?
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
          PartNumber: body.partNumber,
        })
      );
    case COMPLETE_MULTIPART_STRING:
      const completedData = await completeMultipart({
        ETags: body.etags,
        Key: body.key,
        UploadId: body.uploadId,
      });
      const complete = {
        ...body,
        completedData: completedData,
        intent: undefined,
      };
      // th cb is the DB stuff
      return typeof cb === "function"
        ? cb(complete)
        : new Response(JSON.stringify(complete));
    default:
      return new Response(null);
  }
};
