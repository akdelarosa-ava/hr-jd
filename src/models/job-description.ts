export default interface JobDescription {
  jobTitle: string;
  jobLevel: string;
  businessArea: string;
  requirements: string;
  description: string;
}

export type JobDescriptionForm = {
  jobTitle: string;
  jobLevel: string;
  businessArea: string;
  requirements: string;
};

export const JobLevels = [
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

export enum JobDescriptionType {
  New = "New job description",
  Existing = "Existing Job Descriptions",
}
