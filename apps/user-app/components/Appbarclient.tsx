"use client"

import { Appbar } from "@repo/ui/Appbar";
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import png from "../public/PayPi.png" 

export const AppbarClient = () => {
    const session = useSession();
    const router = useRouter();

    return <div>
        <Appbar onSignin={signIn} onSignout={async () => {
            await signOut({ callbackUrl: '/signin' }) 
            router.push("/signup")
        }} user={session.data?.user} png={png}/>
    </div>
}