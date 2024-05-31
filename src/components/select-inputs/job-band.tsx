"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobBands } from "@/models/job-description";

type Props = {
  onChange: (value: string) => void;
  value: string | null;
  placeholder?: string;
};

const JobBandSelect = ({ onChange, value, placeholder }: Props) => {
  return (
    <Select onValueChange={onChange} defaultValue={value || ""} value={value || ""}>
      <SelectTrigger className="border-slate-700 w-full text-gray-900 data-[placeholder]:text-gray-500">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {JobBands.map((band, index) => (
          <SelectItem key={index} value={band}>
            {band}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default JobBandSelect;
