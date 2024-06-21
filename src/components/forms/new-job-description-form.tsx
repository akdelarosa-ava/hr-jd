/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import BusinessAreaSelect from "@/components/select-inputs/business-area";
import JobBandSelect from "@/components/select-inputs/job-band";
import DepartmentSelect from "@/components/select-inputs/departments";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { biasCheck, cn } from "@/lib/utils";
import { useGenerate } from "@/hooks/job-description-hooks";
import JobDescription from "@/models/job-description";
import { AxiosError } from "@/services/axios-client";

const formSchema = z.object({
  job_title: z
    .string()
    .min(1, { message: "Please provide a valid Job Title." }),
  job_band: z.string().optional(),
  business_area: z
    .string()
    .min(1, { message: "Please select a Business Area." }),
  department: z.string().min(1, { message: "Please select a Department" }),
  additional_info: z.string().default(""),
  count: z.number(),
});

type FormModel = z.infer<typeof formSchema>;

type Props = {
  setFormValues: Dispatch<SetStateAction<JobDescription>>;
  setJobDescriptionValue: Dispatch<SetStateAction<string>>;
  countValue: number;
  editMode: boolean;
  clearForm: boolean;
  setClearForm: Dispatch<SetStateAction<boolean>>;
};

const NewJobDescriptionForm = ({
  setFormValues,
  setJobDescriptionValue,
  countValue,
  editMode,
  clearForm,
  setClearForm,
}: Props) => {
  const newJDForm = useForm<FormModel>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_title: "",
      job_band: "",
      business_area: "",
      department: "",
      additional_info: "",
      count: countValue,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = newJDForm;

  const { toast } = useToast();

  const onSuccess = (data: JobDescription) => {
    if (data.job_description) {
      const bias = data.bias;
      const formatted_jd = biasCheck(data.job_description, bias);
      data = { ...data, job_description: formatted_jd };

      if (data.job_description != undefined) {
        setJobDescriptionValue(data.job_description);
        setFormValues(data);
      }

      toast({
        className: cn("top-right"),
        description: `Job Description for ${data.job_title} has been generated.`,
      });
    }
  };

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
          variant: "destructive",
        });
      } else {
        let message: ReactNode;
        let title: string;
        if (Array.isArray(error)) {
          title = "Error!";
          message = "An error has occurred.";
        } else {
          title = error.message;
          message = error.response.data.detail;
        }

        toast({
          title: title,
          className: cn("top-right"),
          description: message,
          variant: "destructive",
        });
      }
    }
  };

  const { mutate, isPending } = useGenerate(onSuccess, onError);

  const onSubmit = (data: FormModel) => {
    mutate(data);
  };

  useEffect(() => {
    if (clearForm) {
      newJDForm.reset();
      setClearForm(false);
    }
  }, [clearForm]);

  return (
    <>
      <Form {...newJDForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-3">
            <FormField
              control={control}
              name="job_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold mb-3">
                    Job Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      data-testid="job_title"
                      className="border-slate-700 w-full focus:ring-0 focus:outline-none focus:ring-offset-0"
                      placeholder="eg. UI/UX Designer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col lg:flex-row w-full lg:w-1/2 mb-3">
            <div className="flex flex-col w-full lg:pr-3">
              <FormField
                control={control}
                name="job_band"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold mb-3">
                      Job Band
                    </FormLabel>
                    <FormControl>
                      <JobBandSelect
                        placeholder="Select Job Band"
                        onChange={field.onChange}
                        value={field.value}
                      />
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold mb-3">
                      Business Area <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <BusinessAreaSelect
                        placeholder="Select Business Area"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
              <FormField
                control={control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold mb-3">
                      Department <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <DepartmentSelect
                        placeholder="Select Department"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col mb-3">
            <FormField
              control={control}
              name="additional_info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold mb-3">
                    Additional Information
                  </FormLabel>
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
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" defaultValue={countValue} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:items-end">
            <Button className="bg-blue-800 p-6" disabled={editMode}>
              Generate Result <LuSendHorizonal className="ml-3 text-base" />
            </Button>
          </div>
        </form>
      </Form>
      <CircleSpinnerOverlay
        loading={isPending}
        color="#371376"
        message="Generating Job Description..."
      />
    </>
  );
};

export default NewJobDescriptionForm;
