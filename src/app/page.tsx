"use client";
import NewJobDescriptionForm from "@/components/forms/new-job-description-form";
import PageLayout from "@/components/layouts/page-layout";
import PageTitle from "@/components/layouts/page-title";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import {
  LuCheck,
  LuCopy,
  LuDownload,
  LuPen,
  LuRefreshCw,
  LuX,
} from "react-icons/lu";

import { JobDescriptionType } from "@/models/job-description";
import RadioMenu from "./_components/radio-menu";
import SearchResult from "./_components/search-result";
import { Card, CardContent } from "@/components/ui/card";
import ExistingJobDescriptionForm from "@/components/forms/existing-job-description-form";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import TooltipProvider from "@/components/tooltips/tooltip-provider";
import WordCountTooltip from "@/components/tooltips/word-count-tooltip";

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
          <div className="flex flex-col justify-between">
            <h2 className="text-lg lg:text-xl xl:text-2xl text-wrap lg:mt-3 font-semibold text-blue-800">
              Result:
            </h2>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <span className="flex flex-row text-base font-medium py-4">
                GPT4
              </span>
              <div className="flex flex-row gap-3 justify-center">
                <span className="text-base font-medium py-4">Count:</span>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row justify-between text-xs mb-1">
                    <span>500</span>
                    <span>1000</span>
                    <span>1500</span>
                  </div>
                  <Slider
                    defaultValue={[500]}
                    min={500}
                    max={1500}
                    step={500}
                    className="w-[150px] text-blue-800 focus:ring-0 focus:outline-none"
                    color="text-blue-600"
                    onValueChange={(value) => changeCountValue(value)}
                  />
                </div>

                <TooltipProvider tip={<WordCountTooltip />}>
                  <Input
                    type="number"
                    className="w-[65px] focus:ring-0 focus:outline-none p-1 text-right mt-1 rounded-md"
                    value={countValue}
                    readOnly
                    onChange={(e) =>
                      e.target.value == ""
                        ? setCountValue(0)
                        : setCountValue(parseInt(e.target.value))
                    }
                  />
                </TooltipProvider>
                <span className="text-base font-medium py-4">words</span>

                <TooltipProvider tip="To let A.I. regenrate new result.">
                  <Button
                    variant="ghost"
                    className="text-nowrap text-blue-800 text-base font-medium hidden lg:flex lg:mt-1"
                  >
                    <LuRefreshCw className="mr-2 text-base" /> Re-generate
                  </Button>
                </TooltipProvider>
              </div>
            </div>
            <TooltipProvider tip="To let A.I. regenrate new result.">
              <Button
                variant="ghost"
                className="text-blue-800 text-base font-medium lg:hidden"
              >
                <LuRefreshCw className="mr-3 text-base" /> Re-generate
              </Button>
            </TooltipProvider>
          </div>

          <ScrollArea className="min-h-[500px] w-full rounded-xl border-[1px] border-collapse border-gray-300 bg-white"></ScrollArea>

          <div className="flex flex-col lg:flex-row gap-3">
            <div className="w-full flex flex-col lg:w-2/3 lg:flex-row">
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">{"Disclaimer:"}</span> These
                results are auto-generated by AI. Please review and validate
                them with a human expert before using them for your purposes.
              </p>
            </div>
            <div className="w-full flex flex-col lg:w-1/3 lg:flex-row justify-end gap-4">
              <Button className="text-white min-w-[150px]">
                <LuPen className="mr-3 text-base" /> Edit
              </Button>

              <Button
                variant="ghost"
                className="text-blue-800 font-semibold hidden"
              >
                <LuX className="mr-3 text-base" /> Discard
              </Button>

              <Button className="text-white hidden">
                <LuCheck className="mr-3 text-base" /> Save Changes
              </Button>

              <Button
                variant="ghost"
                className="text-blue-800 font-semibold hidden"
              >
                <LuCopy className="mr-3 text-base" /> Copy
              </Button>

              <Button
                variant="ghost"
                className="text-blue-800 font-semibold hidden"
              >
                <LuDownload className="mr-3 text-base" /> Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
