import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { DepartmentComponent } from '../cell-renderer/department/department.component';
import { JobRiskLevelComponent } from '../cell-renderer/job-risk-level/job-risk-level.component';
import { JobModel } from '../models/Job';
import { DepartmentService } from '../other-services/department.service';
import { JobService } from '../other-services/job.service';
import { DataGridFunctions } from '../utilities/data-grid-functions';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css']
})
export class ManageJobsComponent implements OnInit {

  selection: boolean = false;
  gridEdited: boolean = false;
  value = '';
  // columnApi: any;
  gridOptions: GridOptions;
  jobs: JobModel[];
  job: JobModel;

  columnDefs = [
    { field: 'job_Name', headerName: 'Nombre del Trabaja', colId: "0", width: 400, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams},
    { field: 'job_Risk_Level', headerName: 'Nivel de Riesgo', colId: "1", width: 250, editable: false, cellRenderer: 'riskLevelCellRenderer'},
    { field: 'job_Min_Salary', headerName: 'Salario Minimo', colId: "2", width: 300, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams, valueFormatter: DataGridFunctions.currencyFormatter},
    { field: 'job_Max_Salary', headerName: 'Salario Maximo', colId: "3", width: 300, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams, valueFormatter: DataGridFunctions.currencyFormatter},
    { field: 'job_State', headerName: 'Estado', colId: "4", width: 225, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams,},
    { field: "job_Department.department_Name", headerName: 'Departamento', cellRenderer: 'departmentCellRenderer', width: 300, colId: "8", editable: false},
    {
      field: "Gestionar",
      headerName: "",
      width: 200,
      colId: "5",
      checkboxSelection: true,
      editable: false,
      cellClass: "ag-check-cell",
    },
    { field: "Modified", colId: "6", hide: true },
    { field: "job_Id", colId: "7", hide: true },
    { field: "job_Department.department_Id", headerName: "ID_Departamento", colId: "9", hide: true },

  ];

  defaultColDef = {
    resizable: true,
    editable: true,
    singleClickEdit: true, enableCellChangeFlash: true, suppressMovable: true,
  }

  rowData: any = [];
  frameworkComponents

  constructor(
    private jobService: JobService,
    private router: Router,
    private departmentService: DepartmentService,
  ) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((res) => {
      console.log(res);
      this.rowData = res;
    });
    this.frameworkComponents = {
      riskLevelCellRenderer: JobRiskLevelComponent,
      departmentCellRenderer: DepartmentComponent
    };
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

  onAddRow() {
    const newRows = [
      {
        job_Name: "",
        job_Risk_Level: "",
        job_Min_Salary: "0",
        job_Max_Salary: "0",
        job_State: "Vacante",
        Modified: "New",
        job_Department: { department_Name: "",
                          department_Id: ""
                        },
        job_Id: "",
      },
    ];
    this.gridOptions.api.applyTransaction({ add: newRows });
  }

  onDeleteRow() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
    var selectedNodes = this.gridOptions.api.getSelectedNodes();
    for(let row of selectedRows) {
      this.jobService.deleteJob(row.job_Id).subscribe(res => {
        this.gridOptions.api.applyTransaction({ remove: selectedRows });
      }, err => {
        window.alert("Hubo un error al borrar el registro")
      });
    }
  }

  onSaveChanges() {
    var row;
    var modifiedRows: Array<number> = [];
    for (let i = 0; i < this.gridOptions.api.getDisplayedRowCount(); i++) {
      row = this.gridOptions.api.getDisplayedRowAtIndex(i);
      if (this.gridOptions.api.getValue("6", row) == "true") {
        modifiedRows.push(i);
      }
    }
    var row2;
    for (let x of modifiedRows) {
      this.job = new JobModel();
      row2 = this.gridOptions.api.getDisplayedRowAtIndex(x);
      this.job.job_Name = this.gridOptions.api.getValue("0", row2);
      this.job.job_Risk_Level = this.gridOptions.api.getValue("1", row2);
      this.job.job_Min_Salary = this.gridOptions.api.getValue("2", row2).toString()
      .trim()
      .replace(" ", "")
      .replace(",", "")
      .replace(",", "")
      .replace("DOP", "")
      .trim();
      this.job.job_Max_Salary = this.gridOptions.api.getValue("3", row2).toString()
      .trim()
      .replace(" ", "")
      .replace(",", "")
      .replace(",", "")
      .replace("DOP", "")
      .trim();
      this.job.job_State = this.gridOptions.api.getValue("4", row2);
      this.job.job_Id = this.gridOptions.api.getValue("7", row2);
      this.departmentService.getDepartmentById(this.gridOptions.api.getValue("9", row2)).subscribe(res => {
        this.job.job_Department = res;
        this.jobService.updateJob(this.job, this.job.job_Id).subscribe(res => {
          window.alert("Se ha modificado correctamente")
          //this.gridOptions.api.forEachNode(node => node.setDataValue("6", ""))
        }, err => {
          window.alert("Ha ocurrido un fallo en la modificacion")
        });
        // console.log()
        console.log(JSON.stringify(this.job));
      })
    }

    var row3;
      var newRows: Array<number> = [];
      for (let j = 0; j < this.gridOptions.api.getDisplayedRowCount(); j++) {
        row3 = this.gridOptions.api.getDisplayedRowAtIndex(j);
        if (this.gridOptions.api.getValue("6", row3) == "New") {
          newRows.push(j);
        }
      }
      var row4;
      for (let y of newRows) {
        this.job = new JobModel();
        row4 = this.gridOptions.api.getDisplayedRowAtIndex(y);
        this.job.job_Name = this.gridOptions.api.getValue("0", row4);
        this.job.job_Risk_Level = this.gridOptions.api.getValue("1", row4);
        this.job.job_Min_Salary = this.gridOptions.api.getValue("2", row4)
        .trim()
        .replace(" ", "")
        .replace(",", "")
        .replace(",", "")
        .replace("DOP", "")
        .trim();
        this.job.job_Max_Salary = this.gridOptions.api.getValue("3", row4)
        .trim()
        .replace(" ", "")
        .replace(",", "")
        .replace(",", "")
        .replace("DOP", "")
        .trim();
        this.job.job_State = this.gridOptions.api.getValue("4", row4);
        this.departmentService.getDepartmentById(this.gridOptions.api.getValue("9", row4)).subscribe(res => {
          this.job.job_Department = res;
          this.jobService.createJob(this.job).subscribe(res => {
            window.alert("Se ha insertado correctamente")
            //this.gridOptions.api.forEachNode(node => node.setDataValue("6", ""))
          }, err => {
            window.alert("Ha ocurrido un fallo en la insercion")
          })
      })
    }
  }
}
