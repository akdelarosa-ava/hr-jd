export default interface JobDescription {
  _id: string | undefined;
  job_title: string | undefined;
  job_band: string | undefined;
  business_area: string | undefined;
  department: string | undefined;
  additional_info: string | undefined;
  count: number;
  job_description: string | undefined;
  job_description_formatted?: string | undefined;
  bias?: Bias;
}

export type Bias = {
  banned_words: string[];
  warning_words: string[];
  masculine_words: string[];
  feminine_words: string[];
  message: string;
}

export type JobDescriptionForm = {
  _id?: string | undefined;
  job_title?: string | undefined;
  job_band?: string | undefined;
  business_area?: string | undefined;
  department?: string | undefined;
  additional_info?: string | undefined;
  count: number;
};

export const JobBands = [
  "Core A",
  "Core B",
  "Implement A",
  "Implement B",
  "Guide A",
  "Guide B",
  "Translate A",
  "Translate B",
  "Lead",
];

export const BusinessAreas = ["BA 1", "BA 2", "BA 3", "BA 4", "BA 5"];

export const Departments = [
  "Department 1",
  "Department 2",
  "Department 3",
  "Department 4",
  "Department 5",
];

export enum JobDescriptionType {
  New = "Generate New Job Description/Role Profile",
  Existing = "Search Existing Job Descriptions",
}
