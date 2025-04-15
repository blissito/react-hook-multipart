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

type OnUploadProgress = (event: {
    total: number;
    loaded: number;
    percentage: number;
}) => void;
declare const useUploadMultipart: (options?: {
    onUploadProgress?: OnUploadProgress;
    handler?: string;
    access?: "public-read" | "private";
    multipart?: true;
}) => {
    upload: (arg0: string, arg1: File) => Promise<UploadCompletedData>;
};

export { useUploadMultipart };
