import JobDescription, { JobDescriptionForm } from "@/models/job-description";
import { JobDescriptionService } from "@/services/job-description-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const JOB_DESC_CACHE_KEY = "job_description";
export const EXT_JOB_DESC_CACHE_KEY = "ext_job_description";

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
        queryKey: [JOB_DESC_CACHE_KEY],
      });

      onSuccess(data);
    },
    onError: (error, _) => {
      if (!onError) return;

      // if (error instanceof AxiosError && error.response) {
      //   console.log(error.response.data.errors);
      //   return;
      // }

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
        queryKey: [JOB_DESC_CACHE_KEY],
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

export const useSaveJobDescription = (
  onSuccess?: (data: JobDescription) => void,
  onError?: (error: Error | string[]) => void
) => {
  const jdService = new JobDescriptionService<JobDescription>("/save");
  const queryClient = useQueryClient();

  return useMutation<JobDescription, Error, JobDescription>({
    mutationFn: (input: JobDescription) => jdService.post(input),
    onSuccess: (data) => {
      if (!onSuccess) return;

      queryClient.invalidateQueries({
        queryKey: [JOB_DESC_CACHE_KEY]
      });

      onSuccess(data);
    },
    onError: (error, _) => {
      if (!onError) return;

      if (error instanceof AxiosError && error.response) {
        console.log(error);
        return;
      }

      onError(error);
    }
  });
}

export const useSearchResult = (
  onSuccess?: (data: JobDescription) => void,
  onError?: (error: Error | string[]) => void
) => {
  const jdService = new JobDescriptionService<JobDescription>("/search");
  const queryClient = useQueryClient();

  return useMutation<JobDescription, Error, JobDescriptionForm>({
    mutationFn: (input: JobDescriptionForm) => jdService.post(input),
    onSuccess: (data) => {
      if (!onSuccess) return;

      queryClient.invalidateQueries({
        queryKey: [EXT_JOB_DESC_CACHE_KEY],
      });

      onSuccess(data);
    },
    onError: (error, _) => {
      if (!onError) return;

      // if (error instanceof AxiosError && error.response) {
      //   console.log(error.response.data.errors);
      //   return;
      // }

      onError(error);
    },
  });
};

export const useSearchByID = (
  onSuccess?: (data: JobDescription) => void,
  onError?: (error: Error | string[]) => void
) => {
  const jdService = new JobDescriptionService<JobDescription>("/jobdescription");
  const queryClient = useQueryClient();

  return useMutation<JobDescription, Error, JobDescriptionForm>({
    mutationFn: (input: JobDescriptionForm) => jdService.get(input._id ?? ""),
    onSuccess: (data) => {
      if (!onSuccess) return;

      queryClient.invalidateQueries({
        queryKey: [EXT_JOB_DESC_CACHE_KEY],
      });

      onSuccess(data);
    },
    onError: (error, _) => {
      if (!onError) return;

      // if (error instanceof AxiosError && error.response) {
      //   console.log(error.response.data.errors);
      //   return;
      // }

      onError(error);
    },
  });
};