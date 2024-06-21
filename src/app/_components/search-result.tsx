"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { extractSentence } from "@/lib/utils";
import JobDescription from "@/models/job-description";
import { Dispatch, SetStateAction } from "react";

type Props = {
  topThree: JobDescription[];
  setFormValues: Dispatch<SetStateAction<JobDescription>>;
  setJobDescriptionValue: Dispatch<SetStateAction<string>>
}
const SearchResult = ({topThree,setFormValues,setJobDescriptionValue}:Props) => {
  const handleSelection = (data:JobDescription) => {
    setFormValues(data);
    setJobDescriptionValue(data.job_description ?? "")
  }
  return (
    <>
      <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl text-wrap">
        Top 3 Search Result:
      </h2>
      <p className="text-base">
        Select the Job Title to view the full description or modify your search
        for different results.
      </p>
      <div className="flex flex-col md:flex-row gap-3">
        {
          topThree.map((x,i) => (
            <Card 
              onClick={() => handleSelection(x)} 
              key={i} 
              className="cursor-pointer w-full md:w-1/3 bg-gray-100 hover:border-gray-500 drop-shadow-lg"
            >
              <CardHeader className="text-lg font-medium">{x.job_title}</CardHeader>
              <CardContent 
                className="nowrap overflow-hidden text-ellipsis text-sm" 
                dangerouslySetInnerHTML={{__html: extractSentence(x.job_description ?? "")}} 
                title={x.job_description}></CardContent>
            </Card>
          ))
        }
      </div>
    </>
  );
};

export default SearchResult;
