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
}: {
  defaultValue: string;
  defaultName: string;
  data: { name: string; value: string }[];
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <Select onValueChange={setValue} defaultValue={value}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={defaultName} />
      </SelectTrigger>
      <SelectContent>
        {data.map(({ name, value }) => (
          <SelectItem key={name} value={value}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
