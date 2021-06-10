import { JobModel } from "./Job";

export class ExperienceModel {
  experience_Id: number;
  experience_Business: string;
  experience_Job: JobModel;
  experience_Start_Date: Date;
  experience_Final_Date: Date;
  experience_Salary: number;
}
