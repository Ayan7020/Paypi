"use client"

import { FaEye } from "react-icons/fa";
import { Input } from "./shad/ui/input";  
import { FaEyeSlash } from "react-icons/fa"; 
import { useState } from "react"; 
 

export default function ({text,onChange}:{text:string,onChange: any}) {

    const [showpassword,setshowpassword] = useState(false)

    return <div className="flex" >
        <Input placeholder={text} type={showpassword? "text":"password"} className="p-6 text-lg w-6/5 shadow-md bg-slate-100 rounded-r-none" onChange={onChange} required/>
        <div className="shadow-md rounded-r-xl bg-slate-200 flex justify-center items-center align-center hover:ring-2" onClick={() => {
            setshowpassword(!showpassword)
        }}>
            {showpassword? <FaEye className="w-[60px] "/>:<FaEyeSlash className="w-[60px] "/>} 
        </div>
    </div>
}
