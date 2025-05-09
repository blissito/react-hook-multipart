import { completeMultipart, createMultipart, getPutPartUrl } from "./utils";
import { COMPLETE_MULTIPART_STRING, CREATE_MULTIPART_STRING, CREATE_PUT_PART_URL_STRING, } from "./constants";
// server
export const handler = async (request, cb, options) => {
    const { ACL = "private", directory = "" } = options || {};
    // @todo auth?
    const body = await request.json();
    switch (body.intent) {
        case CREATE_MULTIPART_STRING:
            const path = directory + body.fileName;
            return new Response(JSON.stringify(await createMultipart(path, body.access || ACL)));
        case CREATE_PUT_PART_URL_STRING:
            return new Response(await getPutPartUrl({
                Key: body.key,
                UploadId: body.uploadId,
                PartNumber: body.partNumber,
            }));
        case COMPLETE_MULTIPART_STRING:
            const completedData = await completeMultipart({
                ETags: body.etags,
                Key: body.key,
                UploadId: body.uploadId,
            });
            const complete = {
                ...body,
                completedData,
                intent: undefined,
            };
            console.info("::MULTIPART_COMPLETED:: ", complete.key);
            return typeof cb === "function"
                ? cb(complete)
                : new Response(JSON.stringify(complete));
        default:
            return new Response(null);
    }
};
