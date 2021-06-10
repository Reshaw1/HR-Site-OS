import { CompetencyModel } from "./Competency";
import { EmployeeModel } from "./Employee";
import { ExperienceModel } from "./Experience";
import { FormationModel } from "./Formation";
import { JobModel } from "./Job";
import { LanguajeModel } from "./Languaje";
import { PersonModel } from "./person";

export class CandidateModel {
  candidate_Id: number;
  candidate_Person: PersonModel;
  candidate_Desired_Job: JobModel;
  candidate_Desired_Salary: number;
  candidate_Recommender_Employee: EmployeeModel;
  competencies: CompetencyModel[];
  formations: FormationModel[];
  experiences: ExperienceModel[];
  languajes: LanguajeModel[];
}
