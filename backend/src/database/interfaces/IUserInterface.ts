import { z } from 'zod';
import { LoginUserSchema }   from './ILoginUser';


export const  UserSchema  =  LoginUserSchema.extend({
  id: z.number(),
  accountId: z.number(), 
});

export type IUser = z.infer<typeof UserSchema>



