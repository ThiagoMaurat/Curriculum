ALTER TABLE "curriculum" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "curriculum" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "curriculum" ADD COLUMN "initial_course_date" timestamp;--> statement-breakpoint
ALTER TABLE "curriculum" ADD COLUMN "final_course_date" timestamp;