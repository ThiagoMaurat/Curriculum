ALTER TABLE "curriculum" ADD COLUMN "generatedPDFLink" varchar(191);--> statement-breakpoint
ALTER TABLE "curriculum" ADD COLUMN "generatedPdfFileName" varchar(191);--> statement-breakpoint
ALTER TABLE "curriculum" ADD COLUMN "generatedPdfKey" varchar(191);--> statement-breakpoint
ALTER TABLE "curriculum" ADD COLUMN "generatedPdfUrl" varchar(191);--> statement-breakpoint
ALTER TABLE "curriculum" ADD COLUMN "generatedPdfCreatedAt" timestamp;