"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectBox({
  name,
  placeholder,
  options,
}: {
  name: string;
  placeholder: string;
  options: { name: string; value: string }[];
}) {
  return (
    <div>
      <Select name={name}>
        <SelectTrigger className="w-[calc(100vw-32px)] lg:w-48">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
