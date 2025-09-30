"use client";

import clsx from "clsx";
import { useState } from "react";
import { EyeIcon } from "../svgs";

export default function Input({
  id,
  error,
  placeholder,
  type = "text",
  multiline,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <fieldset>
      <div className="relative">
        {multiline ? (
          <textarea
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            placeholder={placeholder}
            className={clsx(
              "w-full bg-dark-800 border border-dark-600 p-4 rounded-[12px] text-white placeholder:text-dark-400 font-geistSans text-base leading-[22.4px] focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500",
              error &&
                "border-danger-500 focus:ring-danger-500 focus:border-danger-500"
            )}
          />
        ) : (
          <input
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            type={inputType}
            placeholder={placeholder}
            autoComplete="off"
            className={clsx(
              "w-full bg-dark-800 border border-dark-600 h-full p-4 rounded-[12px] text-white placeholder:text-dark-400 font-geistSans text-base leading-[22.4px] focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500",
              error &&
                "border-danger-500 focus:ring-danger-500 focus:border-danger-500",
              type === "password" && "pr-12"
            )}
          />
        )}
        {type === "password" && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors"
          >
            <EyeIcon fill={showPassword ? "white" : "#94A3B8"} />
          </span>
        )}
      </div>
      {error && (
        <p className="text-danger-500 font-geistSans text-xs leading-[22.4px] mt-1">
          {error}
        </p>
      )}
    </fieldset>
  );
}
