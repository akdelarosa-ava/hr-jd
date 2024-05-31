import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import BusinessAreaSelect from "@/components/select-inputs/business-area";
import JobBandSelect from "@/components/select-inputs/job-band";
import DepartmentSelect from "@/components/select-inputs/departments";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useGenerate } from "@/hooks/job-description-hooks";
import JobDescription from "@/models/job-description";

const formSchema = z.object({
  job_title: z.string().min(1,{message: "Please provide a valid Job Title."}),
  job_band: z.string().nullable(),
  business_area: z.string().min(1,{message: "Please select a Business Area."}),
  department: z.string().min(1,{message: "Please select a Department"}),
  additional_info: z.string().default(""),
  count: z.number(),
});

type FormModel = z.infer<typeof formSchema>;

type Props = {
  setFormValues: Dispatch<SetStateAction<JobDescription>>;
  setJobDescriptionValue: Dispatch<SetStateAction<string>>;
  countValue: number;
}

const NewJobDescriptionForm = ({setFormValues, setJobDescriptionValue, countValue}:Props) => {
  const form = useForm<FormModel>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    watch,
    formState: {isValid}
  } = form;

  const { toast } = useToast();

  const onSuccess = (data: JobDescription) => {
    if (data.job_description) {
      setJobDescriptionValue(data.job_description);
      setFormValues(data);
      toast({
        className: cn("top-right"),
        description: `Job Description for ${data.job_title} has been generated.`
      });
    }
    
    
  }

  const onError = (error: Error | string[]) => {
    let message: ReactNode;
    if (Array.isArray(error)) {
      message = "An error has occurred."
    } else {
      message = error.message;
    }

    toast({
      className: cn("top-right"),
      description: message,
      variant: "destructive"
    });
  }

  const {mutate, isPending } = useGenerate(onSuccess, onError);

  const onSubmit = (data: FormModel) => {
    mutate(data);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-3">
            <FormField
              control={control}
              name="job_title"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold mb-3">Job Title <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel className="text-base font-semibold mb-3">Business Area <span className="text-red-500">*</span></FormLabel>
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
                    <FormLabel className="text-base font-semibold mb-3">Department <span className="text-red-500">*</span></FormLabel>
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
              Generate Result <LuSendHorizonal className="ml-3 text-base" />
            </Button>
          </div>
        </form>
      </Form>
      <CircleSpinnerOverlay loading={isPending} message="Generating Job Description..."/>
    </>
  );
};

export default NewJobDescriptionForm;
