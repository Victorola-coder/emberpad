import React from "react";

export default function Textarea({
  name,
  value,
  onChange,
  className,
  placeholder,
}: TextareaProps) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full min-h-[153px] md:min-h-[180px] bg-dark-800 border border-dark-600 rounded-[24px] p-4
        text-white placeholder:text-dark-400 font-geistSans text-[16px] 
        resize-none focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-ember-500 ${className}`}
    />
  );
}
