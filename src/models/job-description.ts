export default interface JobDescription {
  jobTitle: string;
  jobBand: string;
  businessArea: string;
  requirements: string;
  description: string;
}

export type JobDescriptionForm = {
  jobTitle: string;
  jobBand: string;
  businessArea: string;
  requirements: string;
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
  New = "Generate New job description",
  Existing = "Search Existing Job Descriptions",
}
