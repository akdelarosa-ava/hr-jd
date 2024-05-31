import JobDescription, { JobDescriptionForm } from "@/models/job-description";
import { JobDescriptionService } from "@/services/job-description-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const GENERATE_CACHE_KEY = "generate";

export const useGenerate = (
  onSuccess?: (data: JobDescription) => void,
  onError?: (error: Error | string[]) => void
) => {
  const jdService = new JobDescriptionService<JobDescription>("/generate");
  const queryClient = useQueryClient();

  return useMutation<JobDescription, Error, JobDescriptionForm>({
    mutationFn: (input: JobDescriptionForm) => jdService.post(input),
    onSuccess: (data) => {
      if (!onSuccess) return;

      queryClient.invalidateQueries({
        queryKey: [GENERATE_CACHE_KEY],
      });

      onSuccess(data);
    },
    onError: (error, _) => {
      if (!onError) return;

      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.errors);
        return;
      }

      onError(error);
    },
  });
};

export const useRegenerate = (
  onSuccess?: (data: JobDescription) => void,
  onError?: (error: Error | string[]) => void
) => {
  const jdService = new JobDescriptionService<JobDescription>("/regenerate");
  const queryClient = useQueryClient();

  return useMutation<JobDescription, Error, JobDescription>({
    mutationFn: (input: JobDescription) => jdService.post(input),
    onSuccess: (data) => {
      if (!onSuccess) return;

      queryClient.invalidateQueries({
        queryKey: [GENERATE_CACHE_KEY],
      });

      onSuccess(data);
    },
    onError: (error, _) => {
      if (!onError) return;

      if (error instanceof AxiosError && error.response) {
        console.log(error.response.data.errors);
        return;
      }

      onError(error);
    },
  });
};
