import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { DepartmentModel } from '../models/Department';
import { EmployeeModel } from '../models/Employee';
import { DepartmentService } from '../other-services/department.service';
import { EmployeeService } from '../other-services/employee.service';
import { DataGridFunctions } from '../utilities/data-grid-functions';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.css']
})
export class ManageEmployeesComponent implements OnInit {

  selection: boolean = false;
  gridEdited: boolean = false;
  value = '';
  // columnApi: any;
  gridOptions: GridOptions;

  Employees: EmployeeModel[];
  employee: EmployeeModel;

  departmentSelection: boolean = false;
  selectedDepartment: DepartmentModel;
  Departments: DepartmentModel[];

  columnDefs = [
    { field: 'employee_Person.person_Name', headerName: 'Nombre', colId: "0", width: 400, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams},
    { field: 'employee_Job.job_Name', headerName: 'Puesto', colId: "1", width: 250},
    { field: 'employee_Start_Date', headerName: 'Fecha de Inicio', colId: "2", width: 225, valueFormatter: DataGridFunctions.dateFormatter},
    { field: 'employee_Salary', headerName: 'Salario', colId: "3", width: 200, editable: true, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams, valueFormatter: DataGridFunctions.currencyFormatter},
    { field: 'employee_State', headerName: 'Estado', colId: "4", width: 200, editable: true, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams},
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
    { field: "employee_Id", colId: "7", hide: true },
    { field: "employee_Person", colId: "8", hide: true },
    { field: "employee_Job", colId: "9", hide: true },
  ];

  varcolumnDefs = []

  defaultColDef = {
    resizable: true,
    editable: false,
    singleClickEdit: true, enableCellChangeFlash: true, suppressMovable: true,
  }

  rowData: any = [];
  varRowData: any = [];

  constructor(
    private router: Router,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employee = new EmployeeModel
    this.selectedDepartment = new DepartmentModel;
    this.departmentService.getDepartments().subscribe(res => {
      this.Departments = res;
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

  onSelectDepartment() {
    this.departmentSelection = true;
    this.employeeService.getEmployees().subscribe((res) => {
      console.log(res);
      var subArray = [];
      for(let employee of res) {
        if(employee.employee_Job.job_Department.department_Id == this.selectedDepartment.department_Id) {
          subArray.push(employee);
        }
      }
      this.rowData = subArray;
    });
  }

  onGoBack() {
    this.departmentSelection = false
  }

  onSaveChanges() {
    // var row;
    // var modifiedRows: Array<number> = [];
    // for (let i = 0; i < this.gridOptions.api.getDisplayedRowCount(); i++) {
    //   row = this.gridOptions.api.getDisplayedRowAtIndex(i);
    //   if (this.gridOptions.api.getValue("6", row) == "true") {
    //     modifiedRows.push(i);
    //   }
    // }
    // var row2;
    // for (let x of modifiedRows) {
    //   this.job = new JobModel();
    //   row2 = this.gridOptions.api.getDisplayedRowAtIndex(x);
    //   this.job.job_Name = this.gridOptions.api.getValue("0", row2);
    //   this.job.job_Risk_Level = this.gridOptions.api.getValue("1", row2);
    //   this.job.job_Min_Salary = this.gridOptions.api.getValue("2", row2).toString()
    //   .trim()
    //   .replace(" ", "")
    //   .replace(",", "")
    //   .replace(",", "")
    //   .replace("DOP", "")
    //   .trim();
    //   this.job.job_Max_Salary = this.gridOptions.api.getValue("3", row2).toString()
    //   .trim()
    //   .replace(" ", "")
    //   .replace(",", "")
    //   .replace(",", "")
    //   .replace("DOP", "")
    //   .trim();
    //   this.job.job_State = this.gridOptions.api.getValue("4", row2);
    //   this.job.job_Id = this.gridOptions.api.getValue("7", row2);
    //   this.departmentService.getDepartmentById(this.gridOptions.api.getValue("9", row2)).subscribe(res => {
    //     this.job.job_Department = res;
    //     this.jobService.updateJob(this.job, this.job.job_Id).subscribe(res => {
    //       window.alert("Se ha modificado correctamente")
    //       //this.gridOptions.api.forEachNode(node => node.setDataValue("6", ""))
    //     }, err => {
    //       window.alert("Ha ocurrido un fallo en la modificacion")
    //     });
    //     // console.log()
    //     console.log(JSON.stringify(this.job));
    //   })
    // }

    var row3;
      var newRows: Array<number> = [];
      for (let j = 0; j < this.gridOptions.api.getDisplayedRowCount(); j++) {
        row3 = this.gridOptions.api.getDisplayedRowAtIndex(j);
        if (this.gridOptions.api.getValue("6", row3) == "true") {
          newRows.push(j);
        }
      }
      var row4;
      for (let y of newRows) {
        this.employee = new EmployeeModel();
        row4 = this.gridOptions.api.getDisplayedRowAtIndex(y);
        this.employee.employee_Person = this.gridOptions.api.getValue("8", row4);
        this.employee.employee_Start_Date = this.gridOptions.api.getValue("2", row4);
        this.employee.employee_Job = this.gridOptions.api.getValue("9", row4);
        this.employee.employee_Salary = this.gridOptions.api.getValue("3", row4)
        .trim()
        .replace(" ", "")
        .replace(",", "")
        .replace(",", "")
        .replace("DOP", "")
        .trim();
        this.employee.employee_State = this.gridOptions.api.getValue("4", row4);
        this.employee.employee_Id = this.gridOptions.api.getValue("7", row4);
        this.employeeService.updateEmployee(this.employee, this.employee.employee_Id).subscribe(res => {
            window.alert("Se ha modificado correctamente")
            //this.gridOptions.api.forEachNode(node => node.setDataValue("6", ""))
          }, err => {
            window.alert("Ha ocurrido un fallo en la modificacion")
          })
    }
  }

  onExportToCSV() {
    this.gridOptions.api.exportDataAsCsv();
  }
}
