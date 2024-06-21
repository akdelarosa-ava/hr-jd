import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import TooltipProvider from "@/components/tooltips/tooltip-provider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRegenerate } from "@/hooks/job-description-hooks";
import JobDescription from "@/models/job-description";
import { cn } from "@/lib/utils";
import { LuRefreshCw } from "react-icons/lu";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

type Props = {
  data: JobDescription;
  count: number;
  setJobDescriptionValue: Dispatch<SetStateAction<string>>;
  JobDescriptionValue: string;
  editMode: boolean;
};

const RegenerateButton = ({ data, count, setJobDescriptionValue, JobDescriptionValue, editMode }: Props) => {
  const { toast } = useToast();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (JobDescriptionValue != "") {
      setIsDisabled(false);
      if (editMode) {
        setIsDisabled(editMode)
      } else {
        setIsDisabled(editMode)
      }
    } else {
      setIsDisabled(true);
    }
    
  },[JobDescriptionValue, editMode]);

  const onSuccess = (data: JobDescription) => {
    if (data.job_description) {
      setJobDescriptionValue(data.job_description);
      toast({
        className: cn("top-right"),
        description: `Job Description for ${data.job_title} has been generated.`,
      });
    }
  };

  const onError = (error: Error | string[]) => {
    let message: ReactNode;
    if (Array.isArray(error)) {
      message = "An error has occurred.";
    } else {
      message = error.message;
    }

    toast({
      className: cn("top-right"),
      description: message,
      variant: "destructive",
    });
  };

  const { mutate, isPending } = useRegenerate(onSuccess, onError);

  const handleOnClick = (data: JobDescription, count: number) => {
    data = { ...data, count: count };
    mutate(data);
  };

  return (
    <>
      <TooltipProvider tip="To let A.I. re-generate new result.">
        <Button
          onClick={() => handleOnClick(data, count)}
          variant="ghost"
          disabled={isDisabled}
          className="text-nowrap text-blue-800 text-base font-medium lg:flex lg:mt-1"
        >
          <LuRefreshCw className="mr-3 text-base" /> Re-generate
        </Button>
      </TooltipProvider>
      <CircleSpinnerOverlay
        loading={isPending}
        color="#371376"
        message="Re-generating Job Description..."
      />
    </>
  );
};

export default RegenerateButton;
