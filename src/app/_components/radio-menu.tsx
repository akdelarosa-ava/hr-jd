"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { JobDescriptionType } from "@/models/job-description";

type Props = {
  changeTitle: (value: string) => void;
};

const RadioMenu = ({ changeTitle }: Props) => {
  return (
    <div className="flex flex-col mb-5">
      <Label className="text-base font-semibold mb-3">
        Job Description Type <span className="text-red-500">*</span>
      </Label>
      <RadioGroup
        defaultValue="new"
        className="flex flex-col gap-3 lg:flex-row lg:gap-4"
        onValueChange={(value) => changeTitle(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="new" id="new" />
          <Label htmlFor="new">{JobDescriptionType.New}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="existing" id="existing" />
          <Label htmlFor="existing">{JobDescriptionType.Existing}</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RadioMenu;
