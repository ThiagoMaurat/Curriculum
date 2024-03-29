import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing({
  errorFormatter(err) {
    return {
      message: err.message + ". " + err.stack + " " + err.cause,
    };
  },
});

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploadStudent: f({ pdf: { maxFileSize: "4MB", maxFileCount: 12 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user.id) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
