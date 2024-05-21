import { AxiosClient } from "@/services/axios-client";

export class JobDescriptionService<T> extends AxiosClient<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }
}
