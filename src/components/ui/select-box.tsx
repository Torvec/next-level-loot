"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectBox({
  defaultValue,
  defaultName,
  data,
  onValueChange,
}: {
  defaultValue: string;
  defaultName: string;
  data: { name: string; value: string }[];
  onValueChange: (value: string) => void;
}) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={value}>
      <SelectTrigger className="w-[calc(100vw-32px)] lg:w-48">
        <SelectValue placeholder={defaultName} />
      </SelectTrigger>
      <SelectContent>
        {data.map(({ name, value }) => (
          <SelectItem key={value} value={value}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
