/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import NewJobDescriptionForm from "@/components/forms/new-job-description-form";
import PageLayout from "@/components/layouts/page-layout";
import PageTitle from "@/components/layouts/page-title";

import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { LuPen } from "react-icons/lu";

import JobDescription, { JobDescriptionType } from "@/models/job-description";
import RadioMenu from "./_components/radio-menu";
import SearchResult from "./_components/search-result";
import { Card, CardContent } from "@/components/ui/card";
import ExistingJobDescriptionForm from "@/components/forms/existing-job-description-form";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import TooltipProvider from "@/components/tooltips/tooltip-provider";
import WordCountTooltip from "@/components/tooltips/word-count-tooltip";
import RegenerateButton from "./_components/regenerate-button";
import SaveButton from "./_components/save-button";
import DiscardButton from "./_components/discard-button";
import CopyButton from "./_components/copy-button";
import DownloadButton from "./_components/download-button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [title, setTitle] = useState<string>(JobDescriptionType.New);
  const [countValue, setCountValue] = useState<number>(500);
  const [JobDescriptionValue, setJobDescriptionValue] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [clearForm, setClearForm] = useState<boolean>(false);
  const [topThree, setTopThree] = useState<JobDescription[]>([]);
  const [formValues, setFormValues] = useState<JobDescription>({
    _id: "",
    job_title: "",
    job_band: "",
    business_area: "",
    department: "",
    additional_info: "",
    count: 0,
    job_description: "",
    job_description_formatted: "",
    bias: {
      banned_words: [],
      warning_words: [],
      masculine_words: [],
      feminine_words: [],
      message: "",
    },
  });

  let jdObj: JobDescription = formValues;

  const handleChangeTitle = (value: string) => {
    if (value == "existing") {
      setTitle(JobDescriptionType.Existing);
    } else {
      setTitle(JobDescriptionType.New);
    }
  };

  const handleChangeCountValue = (value: number[]) => {
    const sliderValue = value[0];
    setCountValue(sliderValue);
  };

  const handleEditMode = () => {
    localStorage.setItem("job_description", JobDescriptionValue);
    setEditMode(!editMode);
  };

  const onContentBlur = useCallback((e: any) => {
    if (e.currentTarget.textContent) {
      setJobDescriptionValue(e.currentTarget.textContent);
      jdObj = {
        ...formValues,
        job_description: e.currentTarget.textContent,
      };
      setFormValues(jdObj);
    }
  }, []);

  return (
    <PageLayout>
      <div className="flex flex-col mx-5 my-10 xl:w-2/3 xl:mx-auto xl:mt-10">
        <PageTitle title={title} />

        <Card className="flex flex-col mx-0 md:mx-10 lg:mx-12 mb-5 p-5 lg:p-10">
          <CardContent className="flex flex-col gap-4">
            <RadioMenu changeTitle={handleChangeTitle} />
            {title == JobDescriptionType.Existing ? (
              <ExistingJobDescriptionForm
                setFormValues={setFormValues}
                countValue={countValue}
                setJobDescriptionValue={setJobDescriptionValue}
                setTopThree={setTopThree}
                formValues={formValues}
              />
            ) : (
              <NewJobDescriptionForm
                setFormValues={setFormValues}
                countValue={countValue}
                setJobDescriptionValue={setJobDescriptionValue}
                editMode={editMode}
                clearForm={clearForm}
                setClearForm={setClearForm}
              />
            )}
          </CardContent>
        </Card>

        <div
          className={`flex flex-col mx-0 md:mx-10 lg:mx-12 gap-4 mb-5 
          ${title == JobDescriptionType.Existing ? "block" : "hidden"}`}
        >
          <SearchResult
            topThree={topThree}
            setFormValues={setFormValues}
            setJobDescriptionValue={setJobDescriptionValue}
          />
        </div>

        <div className="flex flex-col mx-0 md:mx-10 lg:mx-12 gap-4 mb-5">
          <div className="flex flex-col justify-between">
            <h2 className="text-lg lg:text-xl xl:text-2xl text-wrap lg:mt-3 font-semibold text-blue-800">
              Result: {formValues.job_title}
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
                    onValueChange={(value) => handleChangeCountValue(value)}
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

                <RegenerateButton
                  data={formValues}
                  count={countValue}
                  setJobDescriptionValue={setJobDescriptionValue}
                  JobDescriptionValue={JobDescriptionValue}
                  editMode={editMode}
                  formValues={formValues}
                />
              </div>
            </div>
          </div>

          <div
            className="border border-gray-300 overflow-auto min-h-[300px] max-h-[300px] w-full rounded-xl p-4 bg-white "
            contentEditable={editMode}
            dangerouslySetInnerHTML={{ __html: JobDescriptionValue }}
            onBlur={onContentBlur}
          />
          {/* <Textarea
            className="resize-none min-h-[300px] max-h-[300px] w-full rounded-xl p-4"
            value={JobDescriptionValue}
            readOnly={!editMode}
            onChange={}
          /> */}

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full flex flex-col lg:w-2/5 lg:flex-row">
              <p className="text-gray-700 text-sm pr-5 text-wrap">
                <span className="font-semibold">{"Disclaimer:"}</span> These
                results are auto-generated by AI. Please review and validate
                them with a human expert before using them for your purposes.
              </p>
            </div>
            <div className="w-full flex flex-col lg:w-1/5 lg:flex-row"></div>
            <div className="w-full flex flex-col lg:w-2/5 lg:flex-row justify-end gap-2">
              <CopyButton
                editMode={editMode}
                JobDescriptionValue={JobDescriptionValue}
              />

              <DownloadButton
                editMode={editMode}
                id={formValues._id ?? ""}
                job_title={formValues.job_title ?? ""}
              />

              <Button
                className={`text-white min-w-[150px] ${editMode ? "hidden" : "flex"}`}
                onClick={handleEditMode}
                disabled={JobDescriptionValue == "" ? true : false}
              >
                <LuPen className="mr-3 text-base" /> Edit
              </Button>

              <DiscardButton
                editMode={editMode}
                setJobDescriptionValue={setJobDescriptionValue}
                setEditMode={setEditMode}
              />

              <SaveButton
                editMode={editMode}
                data={formValues}
                setEditMode={setEditMode}
                JobDescriptionValue={JobDescriptionValue}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
