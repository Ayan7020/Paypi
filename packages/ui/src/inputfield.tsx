import { Input } from "./shad/ui/input";
import { motion } from "framer-motion";

interface InputInterface {
  label: string;
  placeholder: string;
  type: string;  
  onChange: any
}

 
export default function ({
  label,
  placeholder,
  type,    
  onChange
}: InputInterface) {
  return (
    <div className="flex flex-col gap-4" >
      <label className="text-xl font-sans font-medium">{label?  label : ""}</label>
      <Input
        placeholder={placeholder}
        type={type}
        className="p-6 text-lg w-6/5 shadow-md bg-slate-100"
        required  
        onChange={onChange}
      />
    </div>
  );
}
