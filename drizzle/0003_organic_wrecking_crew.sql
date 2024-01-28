CREATE TABLE IF NOT EXISTS "curriculum" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullName" varchar(191),
	"presentationName" varchar(191),
	"fathersName" varchar(191),
	"mothersName" varchar(191),
	"birthday" timestamp,
	"identityDocument" varchar(80),
	"CRM" varchar(80),
	"CPF" varchar(80),
	"phone" varchar(80),
	"adress" varchar(80),
	"email" varchar(80),
	"lattes" varchar(80),
	"selfDescription" varchar(500),
	"userId" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "certification" DROP CONSTRAINT "certification_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_roleId_role_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "userId" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "type" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "provider" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "providerAccountId" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "token_type" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "scope" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "session_state" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "sessionToken" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "userId" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "image" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "verificationToken" ALTER COLUMN "identifier" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "verificationToken" ALTER COLUMN "token" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "certification" ADD COLUMN "curriculumId" integer;--> statement-breakpoint
ALTER TABLE "role" ADD COLUMN "userId" varchar(255);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "certification" ADD CONSTRAINT "certification_curriculumId_curriculum_id_fk" FOREIGN KEY ("curriculumId") REFERENCES "curriculum"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role" ADD CONSTRAINT "role_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "certification" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "presentationName";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "fathersName";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "mothersName";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "birthday";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "identityDocument";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "CRM";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "CPF";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "phone";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "adress";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "lattes";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "selfDescription";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "roleId";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "curriculum" ADD CONSTRAINT "curriculum_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
