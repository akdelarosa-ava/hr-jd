import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn, removeHTMLFormat } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { LuCopy } from "react-icons/lu";

type Props = {
  editMode: boolean;
  JobDescriptionValue: string;
};
const CopyButton = ({ editMode, JobDescriptionValue }: Props) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (JobDescriptionValue != "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [JobDescriptionValue, editMode]);

  const handleCopy = (description: string) => {
    if (description != "") {
      description = removeHTMLFormat(description);
      navigator.clipboard.writeText(description);
      toast({
        className: cn("top-right"),
        description: `Job Description is now copied to the clipboard.`,
        variant: "default",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      className={`text-blue-800 font-semibold ${editMode ? "hidden" : "flex"}`}
      disabled={isDisabled}
      onClick={() => handleCopy(JobDescriptionValue)}
    >
      <LuCopy className="mr-3 text-base" /> Copy
    </Button>
  );
};

export default CopyButton;
