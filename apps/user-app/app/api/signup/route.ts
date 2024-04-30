import db from "@repo/db/client"
import { NextRequest, NextResponse } from "next/server"
import { signupInput } from "@repo/common/xod"
import bcrypt from "bcrypt";
  
const  signup = async (req: NextRequest) => {  
    const body = await req.json()   

        const existingUser = await db.user.findFirst({
            where: {
                number: body.number
            }
        }) 
        if(existingUser){
            return NextResponse.json({
                success: false,
                error:{
                    path: "number",
                    message: "This phone number is already in use."
                }
            })
        }
        else {
            const password = await bcrypt.hash(body.password,10)
            try {
                await db.user.create({
                    data: {
                        name: body.username,
                        password: password,
                        number: body.number
                    }
                });
            
                return NextResponse.json({ 
                    success: true
                })

            } catch(e) {
                console.error(e);
            }
        }
    }  

export { signup as POST}