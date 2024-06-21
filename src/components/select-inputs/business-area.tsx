"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BusinessAreas } from "@/models/job-description";

type Props = {
  onChange: (value: string) => void;
  value: string | undefined;
  placeholder?: string;
};

const BusinessAreaSelect = ({ onChange, value, placeholder }: Props) => {
  return (
    <Select onValueChange={onChange} defaultValue={value} value={value} required>
      <SelectTrigger className="border-slate-700 w-full text-gray-900 data-[placeholder]:text-gray-500">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {BusinessAreas.map((area, index) => (
          <SelectItem key={index} value={area}>
            {area}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BusinessAreaSelect;
