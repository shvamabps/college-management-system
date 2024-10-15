import { z } from "zod";

export const registerCollegeFormSchema = z.object({
  collegeName: z.string().min(1, "College Name is required"),
  collegeGroupName: z.string().optional(),
  establishedYear: z.string(),
  affiliatedWith: z.string().optional(),
  collegeBoard: z.string().min(1, "College Board is required"),
});
