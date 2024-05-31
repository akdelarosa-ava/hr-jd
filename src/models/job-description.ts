export default interface JobDescription {
  role_id?: string;
  job_title: string;
  job_band: string | null;
  business_area: string;
  department: string;
  additional_info: string | null;
  count: number;
  job_description: string | null;
}

export type JobDescriptionForm = {
  role_id?: string;
  job_title: string;
  job_band: string | null;
  business_area: string;
  department: string;
  additional_info: string | null;
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
