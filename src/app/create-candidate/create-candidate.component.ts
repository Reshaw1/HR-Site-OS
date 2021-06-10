import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenreEnum } from '../enums/GenreEnum';
import { RiskEnum } from '../enums/RiskEnum';
import { CandidateModel } from '../models/Candidate';
import { CompetencyModel } from '../models/Competency';
import { EmployeeModel } from '../models/Employee';
import { ExperienceModel } from '../models/Experience';
import { FormationModel } from '../models/Formation';
import { JobModel } from '../models/Job';
import { LanguajeModel } from '../models/Languaje';
import { PersonModel } from '../models/person';
import { EmployeeService } from '../other-services/employee.service';
import { JobService } from '../other-services/job.service';
import { PersonService } from '../other-services/person.service';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})
export class CreateCandidateComponent implements OnInit {

  person: PersonModel;
  candidate: CandidateModel;
  competency: CompetencyModel;
  experience: ExperienceModel;
  formation: FormationModel;
  languaje: LanguajeModel;

  Jobs: JobModel[];
  Employees: EmployeeModel[];

  stage: number = 1;

  jobDescription: string

  salaryString: string

  rowDataFormation: any;
  rowDataCompetency: any;
  rowDataExperience: any;
  rowDataLanguaje: any;

  genres: string[] = [
    "Masculino",
    "Femenino",
    "Otro"
  ]

  genre: string = "";



  constructor(
    private personService: PersonService,
    private jobService: JobService,
    private employeeService : EmployeeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.candidate = new CandidateModel;
    this.candidate.candidate_Desired_Job = new JobModel;
    this.candidate.candidate_Person = new PersonModel;
    this.candidate.candidate_Recommender_Employee = new EmployeeModel;

    this.personService.getPersonById(<number>(<unknown>this.route.snapshot.queryParamMap.get("personId"))).subscribe(res => {
      this.candidate.candidate_Person = res
      console.log(GenreEnum[res.person_Genre])
      this.genre = GenreEnum[res.person_Genre];
    });

    this.jobService.getJobs().subscribe(res => {
      this.Jobs = res;
    })

    this.employeeService.getEmployees().subscribe(res => {
      this.Employees = res;
    })
  }

  onSelectionChanged(event) {
    if (this.candidate.candidate_Desired_Job.job_Id) {
      for(let job of this.Jobs) {
        if(job.job_Id == this.candidate.candidate_Desired_Job.job_Id) {
          this.candidate.candidate_Desired_Job = job;
          break
        }
      }
      this.jobDescription =
        "El Trabajo seleccionado es: \n" +
        this.candidate.candidate_Desired_Job.job_Name +
        ". \n en el departamento de: \n" +
        this.candidate.candidate_Desired_Job.job_Department.department_Name +
        ". \n Tiene un nivel de riesgo de: \n" +
        RiskEnum[this.candidate.candidate_Desired_Job.job_Risk_Level]
    }
    console.log(this.jobDescription)
  }

  onBlurSalary() {
    var params = { value: 0 };
    this.candidate.candidate_Desired_Salary = <number>(
      (<any>(
        this.salaryString
          .trim()
          .replace(" ", "")
          .replace(",", "")
          .replace(",", "")
          .replace("DOP", "")
          .trim()
      ))
    );

    params.value = <number>(
      (<any>(
        this.salaryString
          .trim()
          .replace(" ", "")
          .replace(",", "")
          .replace(",", "")
          .replace("DOP", "")
          .trim()
      ))
    );

    this.salaryString = this.currencyFormatter(params);
  }

  currencyFormatter(params) {
    //"RD$" + this.formatNumber(params.value);
    return this.formatter.format(params.value)
 }

 formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'DOP',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

  onGoToNextStage() {
    if(this.stage = 2) {
      for(let job of this.Jobs) {
        if(job.job_Id == this.candidate.candidate_Desired_Job.job_Id) {
          this.candidate.candidate_Desired_Job = job;
          break
        }
      }
      for(let employee of this.Employees) {
        if(employee.employee_Id == this.candidate.candidate_Recommender_Employee.employee_Id) {
          this.candidate.candidate_Recommender_Employee = employee;
          break
        }
      }

    }
    this.stage = this.stage + 1
    console.log(this.candidate)
  }

}
