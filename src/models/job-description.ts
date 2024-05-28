export default interface JobDescription {
  roleId?: string;
  jobTitle: string;
  jobBand?: string;
  businessArea: string;
  department: string;
  additionalInfo?: string;
  description?: string;
}

export type JobDescriptionForm = {
  roleId?: string;
  jobTitle: string;
  jobBand?: string;
  businessArea: string;
  department: string;
  additionalInfo?: string;
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
