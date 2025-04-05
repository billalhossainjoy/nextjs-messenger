import {z} from "zod";

export const signUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>
export type LoginSchemaType = z.infer<typeof loginSchema>