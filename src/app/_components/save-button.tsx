import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSaveJobDescription } from "@/hooks/job-description-hooks";
import { cn, removeHTMLFormat } from "@/lib/utils";
import JobDescription from "@/models/job-description";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { LuCheck } from "react-icons/lu";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

type Props = {
  editMode: boolean;
  data: JobDescription;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  JobDescriptionValue: string;
};
const SaveButton = ({
  editMode,
  data,
  setEditMode,
  JobDescriptionValue,
}: Props) => {
  const { toast } = useToast();

  const onSuccess = (data: JobDescription) => {
    if (data.job_description) {
      toast({
        className: cn("top-right"),
        description: `Job Description for ${data.job_title} has been saved.`,
      });
      localStorage.clear();
      setEditMode(!editMode);
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

  const { mutate, isPending } = useSaveJobDescription(onSuccess, onError);

  const handleOnClick = (data: JobDescription) => {
    const jd = removeHTMLFormat(JobDescriptionValue);
    data = { ...data, job_description: jd };
    mutate(data);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className={`text-white ${editMode ? "flex" : "hidden"}`}>
            <LuCheck className="mr-3 text-base" /> Save Changes
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you would want to save all changes you have made?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="ghost">
              No, keep editing
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleOnClick(data)}
              className="primary"
            >
              Yes, save changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CircleSpinnerOverlay
        loading={isPending}
        color="#371376"
        message="Saving Job Description..."
      />
    </>
  );
};

export default SaveButton;
