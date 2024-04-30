import { z } from 'zod';



export const signupInput = z.object({
    username: z.string().regex(/\d/,"Username contain atleast one number").min(1),
    password: z.string().min(8,"Password must contain at least 8 characters").regex(/[0-9]/,"Password must contain at least one number").regex(/[!@#$%^&*(),.?":{}|<>]/,"Password must contain a special character"),
    number: z.string().regex(/^\d{10}$/,"Enter Valid Number").optional()
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    number: z.string().regex(/^\d{10}$/,"Enter Valid Number"),
    password: z.string(),
});