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
            Job Band <span className="text-red-500">*</span>
          </Label>
          <JobBandSelect placeholder="eg. Core A" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="flex flex-col w-full lg:w-1/2">
          <Label className="text-base font-semibold mb-3">
            Business Area <span className="text-red-500">*</span>
          </Label>
          <BusinessAreaSelect placeholder="eg. Business Area 1" />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <Label className="text-base font-semibold mb-3">
            Department <span className="text-red-500">*</span>
          </Label>
          <DepartmentSelect placeholder="eg. Department 1" />
        </div>
      </div>

      <div className="flex flex-col">
        <Label className="text-base font-semibold mb-3">
          Purpose <span className="text-red-500">*</span>
        </Label>
        <Textarea
          className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0 resize-none"
          placeholder="Enter the Purpose here..."
        />
      </div>

      <div className="flex flex-col">
        <Label className="text-base font-semibold mb-3">
          Landscape <span className="text-red-500">*</span>
        </Label>
        <Textarea
          className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0 resize-none"
          placeholder="Enter the Landscape here..."
        />
      </div>

      <div className="flex flex-col">
        <Label className="text-base font-semibold mb-3">
          Activities <span className="text-red-500">*</span>
        </Label>
        <Textarea
          className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0 resize-none"
          placeholder="Enter the Activities here..."
        />
      </div>

      <div className="flex flex-col mb-3">
        <Label className="text-base font-semibold mb-3">
          Need to know <span className="text-red-500">*</span>
        </Label>
        <Textarea
          className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0 resize-none"
          placeholder="Enter what needs to now..."
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
