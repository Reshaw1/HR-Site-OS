import { JobModel } from "./Job";
import { PersonModel } from "./person";

export class EmployeeModel {
  employee_Id: number;
  employee_Person: PersonModel;
  employee_Start_Date: Date;
  employee_Job: JobModel;
  employee_Salary: number;
  employee_Email: string;
  employee_State: string;
}
