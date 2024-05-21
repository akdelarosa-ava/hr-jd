"use client";
import JobDescriptionForm from "@/components/forms/job-description-form";
import PageLayout from "@/components/layouts/page-layout";
import PageTitle from "@/components/layouts/page-title";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import {
  LuArrowRightLeft,
  LuCopy,
  LuDownload,
  LuRefreshCcw,
} from "react-icons/lu";

import { JobDescriptionType } from "@/models/job-description";
import RadioMenu from "./_components/radio-menu";
import SearchResult from "./_components/search-result";

export default function Home() {
  const [title, setTitle] = useState<string>(JobDescriptionType.New);

  const changeTitle = (value: string) => {
    if (value == "existing") {
      setTitle(JobDescriptionType.Existing);
    } else {
      setTitle(JobDescriptionType.New);
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col mx-5 my-10 xl:mx-[190px] xl:mt-10 h-full">
        <PageTitle title={title} />

        <div className="flex flex-col md:mx-10 xl:mx-40 gap-4 mb-5">
          <RadioMenu changeTitle={changeTitle} />
          <JobDescriptionForm />
        </div>

        <div
          className={`flex flex-col md:mx-10 xl:mx-40 gap-4 mb-5 
          ${title == JobDescriptionType.Existing ? "block" : "hidden"}`}
        >
          <SearchResult />
        </div>

        <div className="flex flex-col md:mx-10 xl:mx-40 gap-4 mb-5">
          <div className="flex flex-row justify-between">
            <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl text-wrap">
              Result: Job 1
            </h2>
            <Button variant="ghost">
              <LuRefreshCcw className="text-2xl text-gray-600" />
            </Button>
          </div>

          <ScrollArea className="min-h-[500px] w-full rounded-lg border-[1px] border-collapse border-gray-300"></ScrollArea>

          <div className="flex flex-col md:flex-row justify-between">
            <Button className="bg-primary p-6">
              Generate Feedback <LuArrowRightLeft className="ml-3 text-base" />
            </Button>
            <div className={`flex flex-row items-center`}>
              <Button variant="ghost">
                <LuCopy className="text-2xl text-gray-600" />
              </Button>
              <Button variant="ghost">
                <LuDownload className="text-2xl text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:mx-10 xl:mx-40 gap-4 mb-5 bg-gray-200 p-5">
          <div className="flex flex-col">
            <h3 className="text-base md:text-lg xl:text-xl font-medium">
              Accept Job Description?
            </h3>
            <p className="text-sm lg:text-base font-base">
              Your feedback on the search results matters. Do you want to save
              this job description to the database for future reference?
            </p>
          </div>

          <div className="flex flex-row gap-2 m-auto">
            <Button className="bg-primary">Yes, Save</Button>
            <Button className="bg-gray-500 hover:bg-gray-400">
              No, Thanks
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
