import { DepartmentModel } from "./Department";

export class JobModel {
  job_Id: number;
  job_Name: string;
  job_Risk_Level: number;
  job_Min_Salary: number;
  job_Max_Salary: number;
  job_State: string;
  job_Department: DepartmentModel;
}
