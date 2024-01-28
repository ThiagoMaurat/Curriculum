ALTER TABLE "curriculum_form" RENAME TO "curriculum";--> statement-breakpoint
ALTER TABLE "curriculum" RENAME COLUMN "adress" TO "address";--> statement-breakpoint
ALTER TABLE "curriculum" DROP CONSTRAINT "curriculum_form_userId_unique";--> statement-breakpoint
ALTER TABLE "certification" DROP CONSTRAINT "certification_curriculumId_curriculum_form_id_fk";
--> statement-breakpoint
ALTER TABLE "curriculum" DROP CONSTRAINT "curriculum_form_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "certification" ADD CONSTRAINT "certification_curriculumId_curriculum_id_fk" FOREIGN KEY ("curriculumId") REFERENCES "curriculum"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "curriculum" ADD CONSTRAINT "curriculum_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "hasSendCertification";--> statement-breakpoint
ALTER TABLE "curriculum" ADD CONSTRAINT "curriculum_userId_unique" UNIQUE("userId");