import { completeMultipart, createMultipartUpload, PART_SIZE, uploadAllParts, } from "./client-utils";
const noop = () => { };
// client
export const useUploadMultipart = (options) => {
    const { access = "private", handler, onUploadProgress = noop, multipart, } = options || {};
    const upload = async (fileName, file, progressCb, options) => {
        const { data } = options || {};
        const metadata = {
            name: file.name,
            size: file.size,
            type: file.type,
        };
        // @todo
        if (!multipart) {
        }
        const numberOfParts = Math.ceil(file.size / PART_SIZE);
        const { uploadId, key } = await createMultipartUpload(handler, fileName, access);
        const etags = await uploadAllParts({
            file,
            handler,
            key,
            numberOfParts,
            uploadId,
            onUploadProgress: progressCb || onUploadProgress,
        });
        const completedData = await completeMultipart({
            access,
            metadata,
            key,
            uploadId,
            etags,
            handler,
            data,
        });
        return {
            uploadId,
            key,
            metadata,
            url: "",
            access,
            completedData,
        };
    }; // upload
    return { upload };
};
