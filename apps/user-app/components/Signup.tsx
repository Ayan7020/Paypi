"use client";
import Inputfield from "@repo/ui/inputfield";
import Passwordfield from "@repo/ui/passwordfield";
import Image from "next/image";

import png from "../public/PayPi.png";
import { Buttons } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { signupInput } from "@repo/common/xod"

export default function () {
  const [screenChange, setScreenchange] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [errorUsername, seterrorUsername] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const [errorNumber, seterrorNumber] = useState(""); 
  const [loading,setloading] = useState(false)
  const router = useRouter();

  async function onClickHandler() {

    const { success,error } =  signupInput.safeParse({username,password})
    const firstIssue = error?.issues[0]; 
    const err_path = firstIssue ? `${firstIssue.path.join('.')}`  : ''
    const err_msg = error?.issues[0]?.message || ""

    if(!success) { 
      seterrorUsername("")
      seterrorPassword("")
      if(err_path === 'username' ) seterrorUsername(err_msg)
      if(err_path === 'password' ) seterrorPassword(err_msg)
    }
    else {
      setScreenchange(!screenChange)
    } 
  } 

  function Signinhandler() {
    router.push("/signin");
  }

  async function Verifyhandler() {
    const { success,error } =  signupInput.safeParse({username,password,number})
    const firstIssue = error?.issues[0]; 
    const err_path = firstIssue ? `${firstIssue.path.join('.')}`  : ''
    const err_msg = error?.issues[0]?.message || ""



    if(!success) {
      if(err_path === 'number' ) seterrorNumber(err_msg)
    }
    else {

      setloading(true)
      const response = await axios.post("http://localhost:3000/api/signup",{
        username,
        password,
        number
      })
      setloading(false)
      if(response.data.success){ 
        router.push("/signin")
      }
      else {
        router.push("/")
      }
  }
  }

  return (
    <motion.div className="flex flex-col gap-5 items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Image src={png} alt="PayPilogo" width={200} className="rounded-full" />
        <h1 className="text-2xl font-bold">Create an account</h1>
      </div>
      {screenChange ? (
        <motion.div className="">
          <div className="flex flex-col gap-5 ">
            <Inputfield
              label="Username"
              placeholder="John Doe"
              type="text"
              onChange={(e: any) => {
                setUsername(e.target.value);
              }}
            />
            {errorUsername ? (
              <div className="text-red-500 font-sans font-medium">
                {errorUsername}
              </div>
            ) : null}
            <Passwordfield
              text="Password"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
            {errorPassword ? (
              <div className="text-red-500 font-sans font-medium">
                {errorPassword}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-center gap-4 mt-6">
            <Buttons text="Next" onClick={onClickHandler} type={"text"} />
            <p className="text-md font-semibold text-gray-500">
              Already have an account
            </p>
            <Buttons text="Signin" onClick={Signinhandler} type={"text"} />
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-5 items-center">
          <Inputfield
            label="Phone Number"
            placeholder="7020023044"
            type="number"
            onChange={(e: any) => {
              setNumber(e.target.value);
            }}
          />
          {errorNumber ? (
              <div className="text-red-500 font-sans font-medium"> 
                {errorNumber}
              </div>
            ) : null}
          <Buttons text="Verify" onClick={Verifyhandler} type={"text"} loading={loading} />
        </div>
      )}
    </motion.div>
  );
}
