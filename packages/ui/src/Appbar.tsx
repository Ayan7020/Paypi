import { Appbutton } from "./AppButton";  
import Image from "next/image";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: any;
  onSignout: any;
  png: any
}

export const Appbar = ({ user, onSignin, onSignout,png }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b-2 px-4 border-slate-300">
      <div className="text-3xl flex flex-col justify-center">
        <div className="flex items-center align-center gap-4"> 
          <Image src={png} alt="PayPilogo" width={70} className="rounded-full" />
            <h1 className="font-bold font-sans text-xl">PayPi</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center pt-2">
        <Appbutton onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Appbutton>
      </div>
    </div>
  );
};
