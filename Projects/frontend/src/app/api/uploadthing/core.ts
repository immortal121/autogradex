// Resource: https://docs.uploadthing.com/nextjs/appdir#creating-your-first-fileroute

import { maxFileCount, maxFileSize } from "@/utils/utils";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    
    media: f({ image: { maxFileSize: maxFileSize, maxFileCount: maxFileCount },
    pdf: { maxFileSize: maxFileSize, maxFileCount: maxFileCount } }).onUploadComplete(async ({ metadata, file }) => {

        console.log("Upload complete for userId:", metadata.userId);
        console.log("file url", file.url);
        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;