import { z } from 'zod';
import { generateMock } from '@anatine/zod-mock';

const userSchema = z.object({
  userId: z.preprocess((val) => Number(val), z.number()),
  profileImage: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;

export const createUser = (user: User) => {
  const result = userSchema.safeParse(user);

  if (!result.success) {
    console.error(result.error.message);
  }

  return result.data;
};

export const createMockUser = (seed?: number) => generateMock(userSchema, { seed });
