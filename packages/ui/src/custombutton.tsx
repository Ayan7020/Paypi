"use client";

import { Button } from "./shad/ui/button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BiLoaderCircle } from "react-icons/bi";

interface ButtonProps {
  text: string;
  onClick: any;
  type: any;
  loading?: boolean
}

export const Buttons = ({
  text,
  onClick,
  type, 
  loading=false, 
}: ButtonProps) => {
  return (
    <div>
      <Button
        className="bg-gray-800 focus:ring-4 focus:ring-blue-500 text-white w-[300px] text-lg p-4 py-6 hover:bg-slate-200 hover:text-black hover:shadow-2xl  hover:ring-2 rounded-2xl"
        onClick={onClick}  
        type={type} 
      >  
        {text} 
        {loading? <BiLoaderCircle className="ml-2 animate-spin" />:
        <MdOutlineKeyboardArrowRight className="ml-2" />}
      </Button>
    </div>
  );
};
