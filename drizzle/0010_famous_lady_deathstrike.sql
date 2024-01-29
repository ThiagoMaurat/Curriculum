ALTER TABLE "curriculum" DROP CONSTRAINT "curriculum_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "role" DROP CONSTRAINT "role_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "product" varchar(191) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "curriculum" ADD CONSTRAINT "curriculum_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role" ADD CONSTRAINT "role_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
