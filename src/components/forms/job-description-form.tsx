import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import BusinessAreaSelect from "@/components/select-inputs/business-area";
import JobLevelSelect from "@/components/select-inputs/job-level";
import { LuSendHorizonal } from "react-icons/lu";

const JobDescriptionForm = () => {
  return (
    <>
      <div className="flex flex-col">
        <Label className="text-base font-semibold mb-3">
          Job Title <span className="text-red-500">*</span>
        </Label>
        <Input
          className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0"
          placeholder="eg. UI/UX Designer"
        />
      </div>

      <div className="flex flex-col">
        <Label className="text-base font-semibold mb-3">
          Job Level <span className="text-red-500">*</span>
        </Label>
        <JobLevelSelect placeholder="eg. Core A" />
      </div>

      <div className="flex flex-col">
        <Label className="text-base font-semibold mb-3">
          Business Area <span className="text-red-500">*</span>
        </Label>
        <BusinessAreaSelect placeholder="eg. Business Area 1" />
      </div>

      <div className="flex flex-col mb-3">
        <Label className="text-base font-semibold mb-3">
          Job Title <span className="text-red-500">*</span>
        </Label>
        <Input
          className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0"
          placeholder="eg. Design Thinking"
        />
      </div>

      <div className="flex flex-col md:items-end">
        <Button className="bg-primary p-6">
          Generate Result <LuSendHorizonal className="ml-3 text-base" />
        </Button>
      </div>
    </>
  );
};

export default JobDescriptionForm;
