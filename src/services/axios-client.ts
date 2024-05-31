import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

export { AxiosError };

export type FetchResponse<T> = {
  results: T[];
};

interface IEntity {
  id: string;
}

export abstract class AxiosClient<T> {
  protected axiosInstance: AxiosInstance;

  constructor(protected endpoint: string) {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "x-functions-key": process.env.API_KEY
      }
    });
  }

  getAll = async (config?: AxiosRequestConfig) => {
    try {
      const controller = new AbortController();
      const res = await this.axiosInstance.get<FetchResponse<T>>(
        this.endpoint,
        config ? { ...config, signal: controller.signal } : {}
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  get = async (id: string, config?: AxiosRequestConfig) => {
    try {
      const controller = new AbortController();
      const res = await this.axiosInstance.get<T>(
        `${this.endpoint}/${id}`,
        config
          ? {
              ...config,
              signal: controller.signal,
            }
          : {}
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  post = async <TData>(data: TData, config?: AxiosRequestConfig) => {
    try {
      const controller = new AbortController();
      const res = await this.axiosInstance.post<T>(
        this.endpoint,
        data,
        config ? { ...config, signal: controller.signal } : {}
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  put = async <TData extends IEntity>(
    data: TData,
    config?: AxiosRequestConfig
  ) => {
    try {
      const controller = new AbortController();
      const res = await this.axiosInstance.put<T>(
        `${this.endpoint}/${data.id}`,
        data,
        config ? { ...config, signal: controller.signal } : {}
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  delete = async (id: string, config?: AxiosRequestConfig) => {
    try {
      const controller = new AbortController();
      const res = await this.axiosInstance.delete<T>(
        `${this.endpoint}/${id}`,
        config ? { ...config, signal: controller.signal } : {}
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}
