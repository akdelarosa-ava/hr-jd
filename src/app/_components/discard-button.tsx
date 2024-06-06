import { Button } from '@/components/ui/button';
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
import React, { Dispatch, SetStateAction } from 'react';
import { LuX } from 'react-icons/lu';
import { CircleSpinnerOverlay } from 'react-spinner-overlay';

type Props = {
    editMode: boolean;
		setJobDescriptionValue: Dispatch<SetStateAction<string>>;
		setEditMode: Dispatch<SetStateAction<boolean>>;
}
const DiscardButton = ({editMode, setJobDescriptionValue, setEditMode}:Props) => {
	const handleOnClick = () => {
		const jd = localStorage.getItem("job_description") || "";
    setJobDescriptionValue(jd);
		setEditMode(!editMode)
  };
  return (
    <>
    	<AlertDialog>
        <AlertDialogTrigger asChild>
					<Button
						variant="ghost"
						className={`text-blue-800 font-semibold ${editMode? 'flex':'hidden'}`}
					>
						<LuX className="mr-3 text-base" /> Discard
					</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you would want to discard all changes you have made?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="ghost">No, keep editing</AlertDialogCancel>
            <AlertDialogAction onClick={handleOnClick} className="primary">Yes, discard changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      
			<CircleSpinnerOverlay
        loading={false}
        color="#371376"
        message="Discarding changes..."
      />
    </>
    
  )
}

export default DiscardButton