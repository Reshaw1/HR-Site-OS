import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { DepartmentModel } from '../models/Department';
import { DepartmentService } from '../other-services/department.service';
import { DataGridFunctions } from '../utilities/data-grid-functions';

@Component({
  selector: 'app-manage-departments',
  templateUrl: './manage-departments.component.html',
  styleUrls: ['./manage-departments.component.css']
})
export class ManageDepartmentsComponent implements OnInit {

  selection: boolean = false;
  gridEdited: boolean = false;
  value = '';
  // columnApi: any;
  gridOptions: GridOptions;
  departments: DepartmentModel[];
  department: DepartmentModel;

  columnDefs = [
    { field: 'department_Name', headerName: 'Nombre del Departamento', colId: "0", width: 400, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams},
    {
      field: "Gestionar",
      headerName: "",
      width: 200,
      colId: "1",
      checkboxSelection: true,
      editable: false,
      cellClass: "ag-check-cell",
    },
    { field: "Modified", colId: "2", hide: true },
    { field: "department_Id", colId: "3", hide: true },

  ];

  defaultColDef = {
    resizable: true,
    editable: true,
    singleClickEdit: true, enableCellChangeFlash: true, suppressMovable: true,
  }

  rowData: any = [];

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((res) => {
      console.log(res);
      this.rowData = res;
    });
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
    if (this.gridOptions.api.getValue("2", node) != "New") {
      node.setDataValue("2", "true");
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
        department_Name: "",
        Modified: "New",
      },
    ];
    this.gridOptions.api.applyTransaction({ add: newRows });
  }

  onDeleteRow() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
    var selectedNodes = this.gridOptions.api.getSelectedNodes();
    for(let row of selectedRows) {
      this.departmentService.deleteDepartment(row.department_Id).subscribe(res => {
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
      if (this.gridOptions.api.getValue("2", row) == "true") {
        modifiedRows.push(i);
      }
    }
    var row2;
    for (let x of modifiedRows) {
      this.department = new DepartmentModel();
      row2 = this.gridOptions.api.getDisplayedRowAtIndex(x);
      this.department.department_Id = this.gridOptions.api.getValue("3", row2);
      this.department.department_Name = this.gridOptions.api.getValue("0", row2);
      this.departmentService.updateDepartment(this.department, this.department.department_Id).subscribe(res => {
        window.alert("Se ha modificado correctamente")
        //this.gridOptions.api.forEachNode(node => node.setDataValue("6", ""))
      }, err => {
        window.alert("Ha ocurrido un fallo en la modificacion")
      });
      // console.log()
      console.log(JSON.stringify(this.department));
    }

    var row3;
      var newRows: Array<number> = [];
      for (let j = 0; j < this.gridOptions.api.getDisplayedRowCount(); j++) {
        row3 = this.gridOptions.api.getDisplayedRowAtIndex(j);
        if (this.gridOptions.api.getValue("2", row3) == "New") {
          newRows.push(j);
        }
      }
      var row4;
      for (let y of newRows) {
        this.department = new DepartmentModel();
        row4 = this.gridOptions.api.getDisplayedRowAtIndex(y);
        this.department.department_Name = this.gridOptions.api.getValue("0", row4);
        console.log(JSON.stringify(this.department));
        this.departmentService.createDepartment(this.department).subscribe(res => {
          window.alert("Se ha insertado correctamente")
          //this.gridOptions.api.forEachNode(node => node.setDataValue("6", ""))
        }, err => {
          window.alert("Ha ocurrido un fallo en la insercion")
        })
      }
  }

  onExportToCSV() {
    this.gridOptions.api.exportDataAsCsv();
  }
}
