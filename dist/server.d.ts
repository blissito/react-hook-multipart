import * as _aws_sdk_client_s3 from '@aws-sdk/client-s3';
import { S3Client } from '@aws-sdk/client-s3';

type Complete = {
    contentType: string;
    size: number;
    metadata: {
        name: string;
        size: number;
        type: string;
    };
    uploadId: string;
    etags: string[];
    key: string;
    data: any;
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
declare const handler: (request: Request, cb?: (arg0: Complete) => Promise<Response>, options?: {
    ACL: "public-read" | "private";
    directory: string;
}) => Promise<Response>;

declare const deleteObjects: (keys: string[], Objects?: {
    Key: string;
}[]) => Promise<_aws_sdk_client_s3.DeleteObjectsCommandOutput>;
declare const listObjectsInFolder: (Prefix: string) => Promise<_aws_sdk_client_s3.ListObjectsV2CommandOutput>;
declare const deleteObject: (Key: string, bucket?: string) => Promise<_aws_sdk_client_s3.DeleteObjectCommandOutput>;
declare const getReadURL: (Key: string, expiresIn?: number, options?: {
    Bucket?: string;
}) => Promise<string>;
declare const fileExist: (Key: string) => Promise<boolean>;
declare const getPutFileUrl: (Key: string, expiresIn: number | undefined, config: {
    ACL?: "public-read" | "private";
    Bucket?: string;
}) => Promise<string>;
declare const getDeleteFileUrl: (Key: string) => Promise<string>;
declare function getS3Client(): S3Client;

export { type Complete, deleteObject, deleteObjects, fileExist, getDeleteFileUrl, getPutFileUrl, getReadURL, getS3Client, handler, listObjectsInFolder };
