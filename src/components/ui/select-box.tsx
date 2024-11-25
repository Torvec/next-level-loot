import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectBox({
  selectValue,
  data,
}: {
  selectValue: string;
  data: { name: string; value: string }[];
}) {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={selectValue} />
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
