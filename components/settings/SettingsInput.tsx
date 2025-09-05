import React from 'react';

interface SettingsInputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  autoComplete?: string;
  className?: string;
  width?: string;
}

export function SettingsInput({ 
  type = 'text',
  placeholder,
  defaultValue,
  value,
  onChange,
  maxLength,
  autoComplete = 'new-password',
  className = "",
  width = "w-[350px]"
}: SettingsInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      autoComplete={autoComplete}
      className={`rounded-lg px-2 py-2 text-sm leading-5 ${width} font-normal text-gray-900 outline-none focus:outline-none bg-background-settings hover:bg-hover ${className}`}
    />
  );
}
