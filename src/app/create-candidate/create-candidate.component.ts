import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { CompetencyTypeEnum } from '../enums/CompetencyTypeEnum';
import { FormationLevelEnum } from '../enums/FormationLevelEnum';
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
import { CandidateService } from '../other-services/candidate.service';
import { EmployeeService } from '../other-services/employee.service';
import { JobService } from '../other-services/job.service';
import { PersonService } from '../other-services/person.service';
import { LanguajeService } from '../other-services/languaje.service';
import { Observable } from 'rxjs';

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
  availableJobs: JobModel[];
  Employees: EmployeeModel[];
  Languajes: LanguajeModel[];

  stage: number = 1;

  jobDescription: string

  salaryString: string

  pastSalaryString: string

  rowDataFormation: any = [];
  rowDataCompetency: any = [];
  rowDataExperience: any = [];
  rowDataLanguaje: any = [];

  genres: string[] = [
    "Masculino",
    "Femenino",
    "Otro"
  ]

  competencyTypes: string[] = [
    "Habilidades Blandas",
    "Habilidades Tecnicas",
    "Habilidades Conceptuales"
  ]

  formationLevels: string[] = [
    "Basica",
    "Media",
    "Tecnico",
    "Grado",
    "PostGrado",
    "Curso en Linea"
  ]

  genre: string = "";

  competencyType: string = "";

  formationLevel: string = "";

  competencyGridOptions: GridOptions;
  formationGridOptions: GridOptions;
  experienceGridOptions: GridOptions;
  languajeGridOptions: GridOptions;

  columnDefsCompetency = [
    { field: 'competency_Name', headerName: "Nombre", width: 150},
    { field: 'competency_Description', headerName: "Descripcion", width: 150},
    { field: 'competency_Type', headerName: "Tipo", width: 150},
    {
      field: "Gestionar",
      headerName: "Seleccionar",
      width: 100,
      colId: "3",
      checkboxSelection: true,
    },
  ];

  columnDefsFormation = [
    { field: 'formation_Description', headerName: "Nombre", width: 150},
    { field: 'formation_Level', headerName: "Nivel", width: 150},
    { field: 'formation_Start_Date', headerName: "Fecha de Inicio", width: 150},
    { field: 'formation_Final_Date', headerName: "Fecha de Fin", width: 150},
    { field: 'formation_Institution', headerName: "Institucion", width: 150},
    {
      field: "Gestionar",
      headerName: "Seleccionar",
      width: 100,
      colId: "3",
      checkboxSelection: true,
    },
  ];

  columnDefsExperience = [
    { field: 'experience_Business', headerName: "Empresa", width: 150},
    { field: 'experience_Job.job_Name', headerName: "Empleo", width: 150},
    { field: 'experience_Start_Date', headerName: "Fecha de Inicio", width: 150},
    { field: 'experience_Final_Date', headerName: "Fecha de Fin", width: 150},
    { field: 'experience_Salary', headerName: "Salario", width: 150},
    {
      field: "Gestionar",
      headerName: "Seleccionar",
      width: 100,
      colId: "3",
      checkboxSelection: true,
    },
  ];

  columnDefsLanguaje = [
    { field: 'languaje_Name', headerName: "Idioma", width: 150},
    {
      field: "Gestionar",
      headerName: "Seleccionar",
      width: 100,
      colId: "3",
      checkboxSelection: true,
    },
  ];

  defaultColDef = {
    resizable: true, editable: false, suppressMovable: true
  }

  constructor(
    private personService: PersonService,
    private jobService: JobService,
    private employeeService : EmployeeService,
    private candidateService : CandidateService,
    private LanguajeService : LanguajeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.candidate = new CandidateModel;
    this.candidate.candidate_Desired_Job = new JobModel;
    this.candidate.candidate_Person = new PersonModel;
    this.candidate.candidate_Recommender_Employee = new EmployeeModel;
    this.formation = new FormationModel;
    this.competency = new CompetencyModel;
    this.experience = new ExperienceModel;
    this.experience.experience_Job = new JobModel;
    this.languaje = new LanguajeModel;

    this.personService.getPersonById(<number>(<unknown>this.route.snapshot.queryParamMap.get("personId"))).subscribe(res => {
      this.candidate.candidate_Person = res
      console.log(GenreEnum[res.person_Genre])
      this.genre = GenreEnum[res.person_Genre];
    });

    this.jobService.getJobs().subscribe(res => {
      this.Jobs = res;
      var subArray = [];
      for(let job of res) {
        if(job.job_State == "Vacante")
        subArray.push(job)
      }
      this.availableJobs = subArray;
      console.log(subArray);
    })

    this.employeeService.getEmployees().subscribe(res => {
      this.Employees = res;
    })

    this.LanguajeService.getLanguajes().subscribe(res => {
      this.Languajes = res;
    })

    this.competencyGridOptions = {
      onGridReady: function (params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        console.log("The grid is ready!");
        this.api.sizeColumnsToFit();
      },
      onGridSizeChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
      onComponentStateChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
    };

    this.formationGridOptions = {
      onGridReady: function (params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        console.log("The grid is ready!");
        this.api.sizeColumnsToFit();
      },
      onGridSizeChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
      onComponentStateChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
    };

    this.experienceGridOptions = {
      onGridReady: function (params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        console.log("The grid is ready!");
        this.api.sizeColumnsToFit();
      },
      onGridSizeChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
      onComponentStateChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
    };

    this.languajeGridOptions = {
      onGridReady: function (params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        console.log("The grid is ready!");
        this.api.sizeColumnsToFit();
      },
      onGridSizeChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
      onComponentStateChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
    };
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
        ". \n Tiene un nivel de riesgo de: \n";
        if(this.candidate.candidate_Desired_Job.job_Risk_Level == 1) {
          this.jobDescription = this.jobDescription + "Bajo";
        }
        if(this.candidate.candidate_Desired_Job.job_Risk_Level == 2) {
          this.jobDescription = this.jobDescription + "Medio";
        }
        if(this.candidate.candidate_Desired_Job.job_Risk_Level == 3) {
          this.jobDescription = this.jobDescription + "Alto";
        }
    }
    console.log(this.jobDescription)
  }

  onSelectionChanged2(event) {
    this.jobService.getJobs().subscribe(res => {
      this.Jobs = res;
      console.log(this.Jobs)
      if (this.experience.experience_Job.job_Id) {
        for(let job of this.Jobs) {
          if(this.experience.experience_Job.job_Id == job.job_Id) {
            this.experience.experience_Job = job;
            console.log(this.experience.experience_Job)
            break
          }
        }
      }
    })
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

  onBlurPastSalary() {
    var params = { value: 0 };
    this.experience.experience_Salary = <number>(
      (<any>(
        this.pastSalaryString
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
        this.pastSalaryString
          .trim()
          .replace(" ", "")
          .replace(",", "")
          .replace(",", "")
          .replace("DOP", "")
          .trim()
      ))
    );

    this.pastSalaryString = this.currencyFormatter(params);
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

  onAddToCompetencyGrid(form: NgForm) {
    const newRows = [
      {
        competency_Name: this.competency.competency_Name,
        competency_Description: this.competency.competency_Description,
        competency_Type: this.competencyType
      },
    ];
    this.competencyGridOptions.api.applyTransaction({ add: newRows });

    form.resetForm();

    this.competency = new CompetencyModel;
  }

  onAddToFormationGrid(form: NgForm) {
    const newRows = [
      {
        formation_Description: this.formation.formation_Description,
        formation_Level: this.formationLevel,
        formation_Start_Date: this.formation.formation_Start_Date,
        formation_Final_Date: this.formation.formation_Final_Date,
        formation_Institution: this.formation.formation_Institution
      },
    ];
    this.formationGridOptions.api.applyTransaction({ add: newRows });

    form.resetForm();

    this.formation = new FormationModel;
  }

  onAddToLanguajeGrid(form: NgForm) {
    if (this.languaje.languaje_Id) {
      for(let languaje of this.Languajes) {
        if(languaje.languaje_Id == this.languaje.languaje_Id) {
          this.languaje = languaje;
          break
        }
      }
    }
    const newRows = [
      {
        languaje_Id: this.languaje.languaje_Id,
        languaje_Name: this.languaje.languaje_Name,
      },
    ];
    this.languajeGridOptions.api.applyTransaction({ add: newRows });

    this.languaje = new LanguajeModel;
    form.resetForm();
  }

  onAddToExperienceGrid(form: NgForm) {

    const newRows = [
      {
        experience_Business: this.experience.experience_Business,
        experience_Job: this.experience.experience_Job,
        experience_Start_Date: this.experience.experience_Start_Date,
        experience_Final_Date: this.experience.experience_Final_Date,
        experience_Salary: this.experience.experience_Salary
      },
    ];
    console.log(newRows)
    this.experienceGridOptions.api.applyTransaction({ add: newRows });
     this.experience = new ExperienceModel;
     this.experience.experience_Job = new JobModel;
     this.pastSalaryString = ""
     form.resetForm();
  }

  onAddToExperienceGridObservable() : Observable<void> {
    const newRows = [
      {
        experience_Business: this.experience.experience_Business,
        experience_Job: this.experience.experience_Job,
        experience_Start_Date: this.experience.experience_Start_Date,
        experience_Final_Date: this.experience.experience_Final_Date,
        experience_Salary: this.experience.experience_Salary
      },
    ];
    console.log(newRows)
    this.experienceGridOptions.api.applyTransaction({ add: newRows });
    return
  }


  onGoToNextStage() {
    if(this.stage == 2) {
      // for(let job of this.Jobs) {
      //   if(job.job_Id == this.candidate.candidate_Desired_Job.job_Id) {
      //     this.candidate.candidate_Desired_Job = job;
      //     break
      //   }
      // }
      if(this.candidate.candidate_Recommender_Employee.employee_Id) {
        for(let employee of this.Employees) {
          if(employee.employee_Id == this.candidate.candidate_Recommender_Employee.employee_Id) {
            this.candidate.candidate_Recommender_Employee = employee;
            break
          }
        }
      }
    }
    if(this.stage == 3) {
      this.candidate.competencies = this.getAllRows(this.competencyGridOptions);
      for(let i of this.candidate.competencies) {
        i.competency_Type = <number><unknown>CompetencyTypeEnum[i.competency_Type];
      }
    }
    if(this.stage == 4) {
      this.candidate.formations = this.getAllRows(this.formationGridOptions);
      for(let i of this.candidate.formations) {
        i.formation_Level = <number><unknown>FormationLevelEnum[i.formation_Level];
      }
    }
    if(this.stage == 5) {
      this.candidate.experiences = this.getAllRows(this.experienceGridOptions);
    }
    if(this.stage == 6) {
      this.candidate.languajes = this.getAllRows(this.languajeGridOptions);
      if(!this.candidate.candidate_Recommender_Employee.employee_Id) {
        this.candidate.candidate_Recommender_Employee = undefined;
      }
      this.candidateService.createCandidate(this.candidate).subscribe(res => {
        this.router.navigateByUrl("/home");
      });
    }

    this.stage = this.stage + 1;
    console.log(this.candidate);
  }

  getAllRows(gridoptions: GridOptions) {
    let rowData = [];
    gridoptions.api.forEachNode(node => rowData.push(node.data));
    return rowData;
  }


}
