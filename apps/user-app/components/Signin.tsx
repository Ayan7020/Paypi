"use client";

import Inputfield from "@repo/ui/inputfield";
import Passwordfield from "@repo/ui/passwordfield";
import Image from "next/image";

import png from "../public/PayPi.png";
import { Buttons } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default  function () {
  const router = useRouter(); 

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setloading] = useState(false);


  const SubmitHandler = async (event: any) => {
    setEmailError("")
    setPasswordError("")

    if(!Email){
      setEmailError("Enter Valid Phone no.")
      return
    }
    else if(!password){
      setPasswordError("Enter Valid Password")
      return
    }
    console.log("clicked SubmitHandler")
    setloading(true)
    const res = await signIn("credentials",{
      number: Email,
      password: password, 
      redirect: false
    }) 
    setloading(false)
    if(res?.ok){   
      router.push("/dashboard")
    } 
    else {
      if(res?.error == "User does not exist"){
        setEmailError("User does not exist")
        return
      }
      else if(res?.error == "Password is incorrect"){
        setPasswordError("Password is incorrect")
        return
      }
    }
  }
  const SignupHandler = (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior
 
    router.push("/signup");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Image src={png} alt="PayPilogo" width={200} className="rounded-full" />
        <h1 className="text-2xl font-bold">Welcome back!</h1>
      </div>
      <div>
        <div className="flex flex-col gap-6">
          <div>
            <Inputfield
              label="Phone no. "
              type="number"
              placeholder="Number"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
            />
            {emailError ? (
              <div>
                <div className="bg-red-600 h-[3px] " />
                <p className="text-red-600">{emailError}</p>
              </div>
            ) : null}
          </div>
          <div>
            <Passwordfield
              text="Password"
              onChange={(e: any) => {
                setPassword(e.target.value); 
              }}
            />
            {passwordError ? (
              <div>
                <div className="bg-red-600 h-[3px] " />
                <p className="text-red-600">{passwordError}</p>
              </div>
            ) : null}
            <div className="w-[150px] "> 
            <Link href={"/"} className="text-cyan-700 hover:underline">
              <p className="mt-4">Forgot password?</p>
            </Link>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Buttons text="Signin" onClick={SubmitHandler} type={"submit"} loading={loading} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-md font-semibold text-gray-500">
          Or create an account
        </h2>
        <Buttons text="Sign-up" onClick={SignupHandler} type={"text"} />
      </div>
    </div>
  );
}
