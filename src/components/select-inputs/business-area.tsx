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
  // onChange: (value: string) => void;
  // value: string;
  placeholder?: string;
};

const BusinessAreaSelect = ({ placeholder }: Props) => {
  return (
    // onValueChange={onChange} defaultValue={value} value={value}
    <Select>
      <SelectTrigger className="border-slate-700 w-full text-gray-900 placeholder:text-gray-500">
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
