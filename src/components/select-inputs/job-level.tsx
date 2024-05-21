"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobLevels } from "@/models/job-description";

type Props = {
  // onChange: (value: string) => void;
  // value: string;
  placeholder?: string;
};

const JobLevelSelect = ({ placeholder }: Props) => {
  return (
    // onValueChange={onChange} defaultValue={value} value={value}
    <Select>
      <SelectTrigger className="border-slate-700 w-full text-gray-900 placeholder:text-gray-500">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {JobLevels.map((level, index) => (
          <SelectItem key={index} value={level}>
            {level}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default JobLevelSelect;
