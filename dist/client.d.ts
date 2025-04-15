type UploadCompletedData = {
    uploadId: string;
    key: string;
    url: string;
    access: string;
    completedData: any;
    metadata: FileMetadata;
    data?: any;
};
type FileMetadata = {
    name: string;
    size: number;
    type: string;
};

type ProgressItems = {
    total: number;
    loaded: number;
    percentage: number;
};
type OnUploadProgressFunction = (event: ProgressItems) => void;
declare const useUploadMultipart: (options?: {
    onUploadProgress?: OnUploadProgressFunction;
    handler?: string;
    access?: "public-read" | "private";
    multipart?: true;
}) => {
    upload: (arg0: string, arg1: File) => Promise<UploadCompletedData>;
};

export { useUploadMultipart };
