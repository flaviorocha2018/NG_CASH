import { z } from 'zod';

export const  LoginUserSchema = z.object({
  username: z.string().min(3, { message:  'nome do usuário deve ser maior que 3 caracteres'}),
  password: z.string().min(8).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/, { 
    message: 'Password must contain at least one letter Uppercase and one number'})
})

export type ILoginUser = z.infer<typeof LoginUserSchema>

// export { ILoginUser, LoginUserSchema }; 