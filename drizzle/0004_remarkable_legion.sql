ALTER TABLE "curriculum" RENAME TO "curriculum_form";--> statement-breakpoint
ALTER TABLE "certification" DROP CONSTRAINT "certification_curriculumId_curriculum_id_fk";
--> statement-breakpoint
ALTER TABLE "curriculum_form" DROP CONSTRAINT "curriculum_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "certification" ADD CONSTRAINT "certification_curriculumId_curriculum_form_id_fk" FOREIGN KEY ("curriculumId") REFERENCES "curriculum_form"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "curriculum_form" ADD CONSTRAINT "curriculum_form_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
