import { z } from 'zod';

//Validate using zod

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type ZodCreateCatDto = z.infer<typeof createCatSchema>;
