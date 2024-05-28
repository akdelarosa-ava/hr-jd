import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import BusinessAreaSelect from "@/components/select-inputs/business-area";
import JobBandSelect from "@/components/select-inputs/job-band";
import { LuSendHorizonal } from "react-icons/lu";
import DepartmentSelect from "../select-inputs/departments";
import { Textarea } from "../ui/textarea";

const NewJobDescriptionForm = () => {
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

      <div className="flex flex-col lg:flex-row w-full lg:w-1/2">
        <div className="flex flex-col w-full lg:pr-3">
          <Label className="text-base font-semibold mb-3">
            Job Band 
          </Label>
          <JobBandSelect placeholder="Select Job Band" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="flex flex-col w-full lg:w-1/2">
          <Label className="text-base font-semibold mb-3">
            Business Area <span className="text-red-500">*</span>
          </Label>
          <BusinessAreaSelect placeholder="Select Business Area" />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <Label className="text-base font-semibold mb-3">
            Department <span className="text-red-500">*</span>
          </Label>
          <DepartmentSelect placeholder="Select Department" />
        </div>
      </div>

      <div className="flex flex-col">
        <Label className="text-base font-semibold mb-3">
          Additional Information
        </Label>
        <Textarea
          className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0 resize-none"
          placeholder="Provide any technical, subject matter, or people management skills essential for the role."
        />
      </div>

      <div className="flex flex-col md:items-end">
        <Button className="bg-blue-800 p-6">
          Generate Result <LuSendHorizonal className="ml-3 text-base" />
        </Button>
      </div>
    </>
  );
};

export default NewJobDescriptionForm;
