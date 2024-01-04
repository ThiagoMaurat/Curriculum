import { env } from "@/../env.mjs";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Curriculum",
  description: "Desenvolva seu currículo médico com o Curriculum.",
  url: env.NEXT_PUBLIC_APP_URL,
};
