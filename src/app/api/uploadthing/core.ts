import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { env } from "../../../../env.mjs";

const f = createUploadthing({
  errorFormatter(err) {
    return {
      message: err.message,
    };
  },
});

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploadStudent: f({ pdf: { maxFileSize: "4MB", maxFileCount: 12 } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const cookie = cookies().get("next-auth.session-token");

      // If you throw, the user will not be able to upload
      if (!cookie) throw new Error("Not logged in");

      const decoded = await decode({
        token: cookie.value,
        secret: env.NEXTAUTH_SECRET,
      });

      if (!decoded?.email) {
        throw new Error("Not logged in");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        userId: decoded.userId,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
