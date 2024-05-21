import JobDescription from "@/models/job-description";
import { JobDescriptionService } from "@/services/job-description-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const DESCRIPTION_CACHE_KEY = "description";

export const useJobDescription = () => {
  const jdService = new JobDescriptionService<JobDescription>("/descriptions");
  return useQuery({
    queryKey: [DESCRIPTION_CACHE_KEY],
    queryFn: () => jdService.getAll(),
  });
};
