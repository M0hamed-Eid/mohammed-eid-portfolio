import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(200, "Use 200 characters or fewer"),
  email: z.email("Enter a valid email").max(254, "Email is too long"),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(5000, "Use 5,000 characters or fewer"),
  // A filled honeypot passes validation, then receives a silent success in API.
  company: z.string().max(200).optional(),
});

export type ContactForm = z.infer<typeof contactSchema>;
