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
  defaultValue,
  defaultName,
  data,
}: {
  name: string;
  defaultValue: string;
  defaultName: string;
  data: { name: string; value: string }[];
}) {
  return (
    <div>
      <Select name={name} defaultValue={defaultValue}>
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
    </div>
  );
}
