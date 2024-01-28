ALTER TABLE "certification" DROP CONSTRAINT "certification_curriculumId_curriculum_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "certification" ADD CONSTRAINT "certification_curriculumId_curriculum_id_fk" FOREIGN KEY ("curriculumId") REFERENCES "curriculum"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
