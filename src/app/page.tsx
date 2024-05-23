"use client";
import NewJobDescriptionForm from "@/components/forms/new-job-description-form";
import PageLayout from "@/components/layouts/page-layout";
import PageTitle from "@/components/layouts/page-title";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import {
  LuArrowRightLeft,
  LuCopy,
  LuDownload,
  LuPen,
  LuRefreshCcw,
  LuRefreshCw,
  LuShieldCheck,
} from "react-icons/lu";

import { JobDescriptionType } from "@/models/job-description";
import RadioMenu from "./_components/radio-menu";
import SearchResult from "./_components/search-result";
import { Card, CardContent } from "@/components/ui/card";
import ExistingJobDescriptionForm from "@/components/forms/existing-job-description-form";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [title, setTitle] = useState<string>(JobDescriptionType.New);
  const [countValue, setCountValue] = useState<number>(500);

  const changeTitle = (value: string) => {
    if (value == "existing") {
      setTitle(JobDescriptionType.Existing);
    } else {
      setTitle(JobDescriptionType.New);
    }
  };

  const changeCountValue = (value: number[]) => {
    const sliderValue = value[0];
    setCountValue(sliderValue);
  };

  return (
    <PageLayout>
      <div className="flex flex-col mx-5 my-10 xl:w-2/3 xl:mx-auto xl:mt-10">
        <PageTitle title={title} />

        <Card className="flex flex-col mx-0 md:mx-10 lg:mx-12 mb-5 p-5 lg:p-10">
          <CardContent className="flex flex-col gap-4">
            <RadioMenu changeTitle={changeTitle} />
            {title == JobDescriptionType.Existing ? (
              <ExistingJobDescriptionForm />
            ) : (
              <NewJobDescriptionForm />
            )}
          </CardContent>
        </Card>

        <div
          className={`flex flex-col mx-0 md:mx-10 lg:mx-12 gap-4 mb-5 
          ${title == JobDescriptionType.Existing ? "block" : "hidden"}`}
        >
          <SearchResult />
        </div>

        <div className="flex flex-col mx-0 md:mx-10 lg:mx-12 gap-4 mb-5">
          <div className="flex flex-col lg:flex-row justify-between">
            <h2 className="text-lg lg:text-xl xl:text-2xl text-wrap lg:mt-3 font-medium">
              Search Result:
            </h2>
            <div className="flex flex-row gap-4 justify-between">
              <div className="flex flex-row gap-3">
                <span className="text-base font-medium py-4">Count:</span>
                <div className="hidden md:flex md:flex-col gap-1">
                  <div className="flex flex-row justify-between">
                    <span>500</span>
                    <span>1000</span>
                    <span>1500</span>
                  </div>
                  <Slider
                    defaultValue={[500]}
                    min={500}
                    max={1500}
                    step={500}
                    className="w-[300px] text-blue-800 focus:ring-0 focus:outline-none"
                    color="text-blue-600"
                    onValueChange={(value) => changeCountValue(value)}
                  />
                </div>

                <Input
                  type="number"
                  className="w-[50px] focus:ring-0 focus:outline-none p-1 text-right mt-1 rounded-md"
                  value={countValue}
                  onChange={(e) =>
                    e.target.value == ""
                      ? setCountValue(0)
                      : setCountValue(parseInt(e.target.value))
                  }
                />
                <span className="text-base font-medium py-4">words</span>
              </div>

              <span className="flex flex-row text-base font-medium py-4">
                GPT-4
              </span>
            </div>
          </div>

          <ScrollArea className="min-h-[500px] w-full rounded-xl border-[1px] border-collapse border-gray-300 bg-white"></ScrollArea>

          <div className="flex flex-col md:flex-row">
            <div className="w-full flex flex-col lg:flex-row justify-end">
              <Button variant="ghost" className="text-primary">
                <LuPen className="mr-3 text-base" /> Edit Result
              </Button>
              <Button variant="ghost" className="text-primary">
                <LuRefreshCw className="mr-3 text-base" /> Regenrate Result
              </Button>
              <Button variant="ghost" className="text-primary">
                <LuShieldCheck className="mr-3 text-base" /> Check for bias
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col mx-0 md:flex-row md:mx-10 lg:mx-12 gap-4 mb-5 bg-gray-200 p-5">
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
