"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import InputField, { InputFieldProps } from "../InputField";

type Props = Omit<InputFieldProps, "type" | "suffix">;
export default function PasswordInput(props: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <InputField
      type={hidden ? "password" : "text"}
      suffix={
        <button
          className="cursor-pointer  min-h-[22px] min-w-[22px] flex items-center justify-center rounded-full"
          onClick={(e) => {
            e.preventDefault();
            setHidden((i) => !i);
          }}
        >
          {hidden ? <IoEye size={20} /> : <IoEyeOff size={20} />}
        </button>
      }
      {...props}
    />
  );
}
