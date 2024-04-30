import CredentialsProvider from "next-auth/providers/credentials";
import db from "@repo/db/client" 
import bcrypt from "bcrypt";
import { signinInput } from "@repo/common/xod";  

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                number: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            async authorize(credentials: any) { 
                const { success } = await signinInput.safeParse(credentials)
                if (!success) { 
                    throw new Error("Invalid credentials");
                }

                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.number
                    }
                });

                if (!existingUser) { 
                    throw new Error("User does not exist");
                }

                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (!passwordValidation) { 
                    throw new Error("Password is incorrect");
                }
 
                return {
                    id: existingUser.id.toString(),
                    name: existingUser.name,
                    number: existingUser.number
                };
            } 
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub;
            return session;
        }
    },
    pages: {
        signIn: '/signin'  
    }
};
