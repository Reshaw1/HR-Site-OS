import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { GenreEnum } from '../enums/GenreEnum';
import { LoginService } from '../login/login.service';
import { CandidateModel } from '../models/Candidate';
import { CandidateService } from '../other-services/candidate.service';
import { EmployeeService } from '../other-services/employee.service';
import { JobService } from '../other-services/job.service';
import { DataGridFunctions } from '../utilities/data-grid-functions';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css']
})
export class ViewCandidateComponent implements OnInit {
  selection: boolean = false;
  gridEdited: boolean = false;
  value = '';
  // columnApi: any;
  gridOptions: GridOptions;
  gridOptions2: GridOptions;

  candidates: CandidateModel[];
  selectedCandidate: CandidateModel;
  candidateSelected: boolean = false;

  salary: string;


  varcolumnDefs = []

  defaultColDef = {
    resizable: true,
    editable: false,
    singleClickEdit: true, enableCellChangeFlash: true, suppressMovable: true,
  }

  rowData: any = [];
  varRowData: any = [];

  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private employeeService: EmployeeService,
    private sysuserService: LoginService
  ) { }

  ngOnInit(): void {
    this.selectedCandidate = new CandidateModel;
    this.candidateService.getCandidatebyPersonId(<number>(<unknown>this.route.snapshot.queryParamMap.get("personId"))).subscribe(res => {
      this.selectedCandidate = res[0];
    })
  }

  ngAfterContentInit() {
    this.gridOptions = {
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
    // this.gridOptions.onCellValueChanged = this.onCellValueChanged;
    this.gridOptions2 = {
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

  onCellValueChanged(params) {
    this.gridEdited = true;
    var node;
    node = params.node;
    if (this.gridOptions.api.getValue("6", node) != "New") {
      node.setDataValue("6", "true");
    }
  }

  onSelectionChanged(event) {
    if (this.gridOptions.api.getSelectedRows().length == 1) {
      this.selection = true;
    } else {
      this.selection = false;
    }
  }

  onViewDetails() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
    this.selectedCandidate = selectedRows[0];
    this.candidateSelected = true
  }

  onShow(param: string) {

    switch(param) {
      case("PI"):
      this.varcolumnDefs = [
        {field: 'candidate_Person.person_Name', headerName: 'Nombre', colId: "0", width: 300},
        {field: 'candidate_Person.person_Card_Id', headerName: 'Cedula', colId: "1", width: 250},
        {field: 'candidate_Person.person_Birthday', headerName: 'Fecha de Nacimiento', colId: "2", width: 250, valueFormatter: DataGridFunctions.dateFormatter},
        {field: 'candidate_Person.person_Genre', headerName: 'Genero', colId: "3", width: 150, valueFormatter: (params) => {return GenreEnum[params.value]}},
        {field: 'candidate_Person.person_Email', headerName: 'Correo', colId: "4", width: 300},
      ]
      this.varRowData = [this.selectedCandidate]
      break;
      case("F"):
      this.varcolumnDefs = [
        {field: 'formation_Description', headerName: 'Descripcion', colId: "0", width: 300},
        {field: 'formation_Level', headerName: 'Nivel', colId: "1", width: 150, valueFormatter: (params) => {return this.onFormationLevel(params)}},
        {field: 'formation_Start_Date', headerName: 'Fecha de Inicio', colId: "2", width: 200, valueFormatter: DataGridFunctions.dateFormatter},
        {field: 'formation_Final_Date', headerName: 'Fecha de Fin', colId: "3", width: 200, valueFormatter: DataGridFunctions.dateFormatter},
        {field: 'formation_Institution', headerName: 'Institucion', colId: "4", width: 300},
      ]
      this.varRowData = this.selectedCandidate.formations;
      break;
      case("C"):
      this.varcolumnDefs = [
        {field: 'competency_Name', headerName: 'Nombre de Competencia', colId: "0", width: 200},
        {field: 'competency_Description', headerName: 'Descripcion', colId: "1", width: 500},
        {field: 'competency_Type', headerName: 'Tipo', colId: "2", width: 200, valueFormatter: (params) => {return this.onCompetencyType(params)}},
      ]
      this.varRowData = this.selectedCandidate.competencies;
      break;
      case("E"):
      this.varcolumnDefs = [
        {field: 'experience_Business', headerName: 'Empresa', colId: "0", width: 300},
        {field: 'experience_Job.job_Name', headerName: 'Trabajo', colId: "1", width: 250},
        {field: 'experience_Start_Date', headerName: 'Fecha de Inicio', colId: "2", width: 200, valueFormatter: DataGridFunctions.dateFormatter},
        {field: 'experience_Final_Date', headerName: 'Fecha de Fin', colId: "3", width: 200, valueFormatter: DataGridFunctions.dateFormatter},
        {field: 'experience_Salary', headerName: 'Salario', colId: "4", width: 200, valueFormatter: DataGridFunctions.currencyFormatter},
      ]
      this.varRowData = this.selectedCandidate.experiences;
      break;
      case("I"):
      this.varcolumnDefs = [
        {field: 'languaje_Name', headerName: 'Idioma', colId: "0", width: 200},
      ]
      this.varRowData = this.selectedCandidate.languajes;
      break
    }

    this.gridOptions2.api.setColumnDefs(this.varcolumnDefs);

  }

  onFormationLevel(param): string {
    switch(param.value) {
      case(1):
      return "Basica"
      case(2):
      return "Media"
      case(3):
      return "Tecnico"
      case(4):
      return "Grado"
      case(5):
      return "PostGrado"
      case(6):
      return "Curso en Linea"
    }
  }

  onCompetencyType(param): string {
    switch(param.value) {
      case(1):
      return "Habilidades Blandas"
      case(2):
      return "Habilidades Tecnicas"
      case(3):
      return "Habilidades Conceptuales"
    }
  }

  onBlurSalary() {
    var params = { value: 0 };

    params.value = <number>(
      (<any>(
        this.salary
          .trim()
          .replace(" ", "")
          .replace(",", "")
          .replace(",", "")
          .replace("DOP", "")
          .trim()
      ))
    );

    this.salary = this.currencyFormatter(params);
  }

  currencyFormatter(params) {
    //"RD$" + this.formatNumber(params.value);
    return this.formatter.format(params.value)
 }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'DOP',
  })

  onExportToCSV() {
    this.gridOptions.api.exportDataAsCsv();
  }
}
