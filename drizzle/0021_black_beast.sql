ALTER TABLE "curriculum" ADD COLUMN "collaboratorId" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "curriculum" ADD CONSTRAINT "curriculum_collaboratorId_user_id_fk" FOREIGN KEY ("collaboratorId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
