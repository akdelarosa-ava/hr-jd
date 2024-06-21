import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import { CircleSpinnerOverlay } from 'react-spinner-overlay';

type Props = {
	editMode: boolean;
	id:string;
	job_title:string
}
const DownloadButton = ({editMode, id, job_title}:Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	useEffect(() => {
		if (id != "") {
			setIsDisabled(false);
		}
	},[id]);
	const handleDownload = async (): Promise<void> => {
		setIsLoading(true);
		const url = `${process.env.API_BASE_URL}/jobdescription/download/${id}`;
		const headers: HeadersInit = {
			"Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"x-functions-key": process.env.API_KEY ?? "",
		};
		const option: RequestInit = {
			method: "GET",
			headers 
		}

		const response = await fetch(url,option);
		const blob = await response.blob();

		if (response.ok) {
			try {
				const link = document.createElement('a');
				const filename = job_title.replace(" ","_");
				link.href = URL.createObjectURL(blob);
				
				link.download = `${id}_${filename}`;
				link.click();
				URL.revokeObjectURL(link.href);
				setIsLoading(false);
				toast({
					className: cn("top-right"),
					description: "File has been downloaded.",
					variant: "default",
				});
			} catch (error) {
				setIsLoading(false);
				toast({
					className: cn("top-right"),
					description: "Error when downloading Document file.",
					variant: "destructive",
				});
			}
			
		}
	}
  return (
    <>
			<Button variant="ghost" 
				className={`text-blue-800 font-semibold ${editMode? 'hidden':'flex'}`} 
				onClick={handleDownload}
				disabled={isDisabled}
			>
				<LuDownload className="mr-3 text-base" /> Download
			</Button>
			<CircleSpinnerOverlay
				loading={isLoading}
				color="#371376"
				message="Saving Job Description..."
			/>
		</>
  )
}

export default DownloadButton