import { Center } from "@repo/ui/Center";
import { Textinput } from "@repo/ui/Textinput";
import Card from "@repo/ui/Usercard";
import { useState } from "react";
import { P2ptransfer } from "../app/lib/actions/P2Ptransfer";

export default function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2 flex flex-col gap-3">
            <Textinput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <Textinput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            <div className="pt-4 flex justify-center">
              <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={async () => {
                   await P2ptransfer(number,Number(amount) * 100) 
              }}>
                Send
              </button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
