import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BusinessAreaSelect from "@/components/select-inputs/business-area";
import JobBandSelect from "@/components/select-inputs/job-band";
import DepartmentSelect from "@/components/select-inputs/departments";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LuSendHorizonal } from "react-icons/lu";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import ExistingJobDescription from "@/models/job-description";
import { useSearchByID, useSearchResult } from "@/hooks/job-description-hooks";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import JobDescription from "@/models/job-description";
import { AxiosError } from "axios";
import { StringDecoder } from "string_decoder";


const formSchema = z.object({
  _id: z.string().optional(),
  job_title: z.string().optional(),
  job_band: z.string().optional(),
  business_area: z.string().optional(),
  department: z.string().optional(),
  additional_info: z.string().optional(),
  count: z.number(),
});

type FormModel = z.infer<typeof formSchema>;

type Props = {
  setFormValues: Dispatch<SetStateAction<ExistingJobDescription>>;
  setJobDescriptionValue: Dispatch<SetStateAction<string>>;
  countValue: number;
  setTopThree: Dispatch<SetStateAction<JobDescription[]>>;
  formValues: JobDescription;
}

const ExistingJobDescriptionForm = ({setFormValues, setJobDescriptionValue, countValue, setTopThree, formValues}:Props) => {
  const existingJDForm = useForm<FormModel>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      job_title: "",
      job_band: "",
      business_area: "",
      department: "",
      additional_info: "",
      count: countValue,
    }
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: {isValid}
  } = existingJDForm;

  const { toast } = useToast();

  const onSuccess = (data: ExistingJobDescription | ExistingJobDescription[]) => {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        setTopThree(data);
        toast({
          className: cn("top-right"),
          description: `Top 3 job descriptions have been retreived.`,
          variant: "default"
        });
      } else {
        toast({
          className: cn("top-right"),
          description: `No job description was found.`,
          variant: "default"
        });
      }
    } else {
      if (data.job_description) {
        setJobDescriptionValue(data.job_description);
        setFieldValues(data);
        setFormValues(data);
        
        toast({
          className: cn("top-right"),
          description: `Job Description for Job ID ${data._id} has been retreived.`,
          variant: "default"
        });
      } else {
        toast({
          className: cn("top-right"),
          description: `No job description was found.`,
          variant: "default"
        });
      }
    }
  }

  const onError = (error: Error | string[]) => {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status == 422) {
        const error_detail = error.response.data.detail;
        const title = error_detail.msg;
        const message = `Invalid input: ${error_detail.input} as a Job Title`;
        toast({
          title: title,
          className: cn("top-right"),
          description: message,
          variant: "destructive"
        });
      } else {
        let message: ReactNode;
        let title: string;
        if (Array.isArray(error)) {
          title = "Error!";
          message = "An error has occurred."
        } else {
          title = error.message;
          message = error.response.data.detail;
        }

        toast({
          title: title,
          className: cn("top-right"),
          description: message,
          variant: "destructive"
        });
      }      
    }
  }

  const {mutate, isPending } = useSearchResult(onSuccess, onError);

  const search = useSearchByID(onSuccess, onError);

  const onSubmit = (data: FormModel) => {
    if (data._id == undefined || data._id == "") {
      if (
        (data.job_title == undefined || data.job_title == "") &&
        (data.job_band == undefined || data.job_band == "") &&
        (data.business_area == undefined || data.business_area == "") &&
        (data.department == undefined || data.department == "") &&
        (data.additional_info == undefined || data.additional_info == "")
      ) {
        toast({
          className: cn("top-right"),
          description: `Please fill out at least 1 input field`,
          variant: "destructive"
        });
      } else {
        mutate(data);
      }
    } else {
      search.mutate(data);
    }
    
  }

  const setFieldValues = (data:ExistingJobDescription | JobDescription) => {
    setValue('_id', data._id);
    setValue('job_title', data.job_title);
    setValue('job_band', data.job_band);
    setValue('business_area', data.business_area);
    setValue('department', data.department);
    setValue('additional_info', data.additional_info);
  }

  // useEffect(() => {
  //   setFieldValues(formValues);
  // },[formValues])

  return (
    <>
      <Form {...existingJDForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row w-full lg:w-1/2 mb-3">
            <div className="flex flex-col w-full pr-3">
              <FormField
                control={control}
                name="_id"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold mb-3">Role ID <span className="text-xs font-light">{"(Optional)"}</span></FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        data-testid="_id"
                        className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
           </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full mb-3">
            <p className="text-base font-normal">{"At least one (1) of following fields must be populated:"}</p>
          </div>

          <div className="flex flex-col mb-3">
            <FormField
              control={control}
              name="job_title"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold mb-3">Job Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      data-testid="job_title"
                      className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0"
                      placeholder="eg. UI/UX Designer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col lg:flex-row w-full lg:w-1/2 mb-3">
            <div className="flex flex-col w-full lg:pr-3">
              <FormField
                control={control}
                name="job_band"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold mb-3">Job Band</FormLabel>
                    <FormControl>
                      <JobBandSelect placeholder="Select Job Band" onChange={field.onChange} value={field.value}/>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-4 mb-3">
            <div className="flex flex-col w-full lg:w-1/2">
              <FormField
                control={control}
                name="business_area"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold mb-3">Business Area</FormLabel>
                    <FormControl>
                      <BusinessAreaSelect placeholder="Select Business Area" onChange={field.onChange} value={field.value}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
              <FormField
                control={control}
                name="department"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold mb-3">Department</FormLabel>
                    <FormControl>
                      <DepartmentSelect placeholder="Select Department" onChange={field.onChange} value={field.value}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col mb-3">
            <FormField
              control={control}
              name="additional_info"
              render={({field}) => (
                
                <FormItem>
                  <FormLabel className="text-base font-semibold mb-3">Additional Information</FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0 resize-none"
                      placeholder="Provide any technical, subject matter, or people management skills essential for the role."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="count"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="hidden"
                      defaultValue={countValue}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:items-end">
            <Button className="bg-blue-800 p-6" disabled={isPending}>
              Search Result <LuSendHorizonal className="ml-3 text-base" />
            </Button>
          </div>
        </form>
      </Form>
      <CircleSpinnerOverlay loading={isPending} color="#371376" message="Searching for Job Description..."/>
    </>
  );
};

export default ExistingJobDescriptionForm;
