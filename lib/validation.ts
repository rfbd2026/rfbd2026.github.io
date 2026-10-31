import { z } from "zod";

const locale = z.enum(["en", "fa"]);
const consent = z.preprocess((value) => value === true || value === "true" || value === "on", z.literal(true));

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(180).optional().default(""),
  service: z.enum(["identity", "packaging", "digital", "other"]),
  message: z.string().trim().min(20).max(5000),
  locale,
  consent,
  website: z.string().max(500).optional().default("")
});

export const newsletterSubmissionSchema = z.object({
  email: z.string().trim().email().max(254),
  locale,
  consent: z.literal(true)
});
