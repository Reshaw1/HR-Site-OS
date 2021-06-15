import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { CandidateModel } from '../models/Candidate';
import { CandidateService } from '../other-services/candidate.service';
import { DataGridFunctions } from '../utilities/data-grid-functions';

@Component({
  selector: 'app-manage-candidates',
  templateUrl: './manage-candidates.component.html',
  styleUrls: ['./manage-candidates.component.css']
})
export class ManageCandidatesComponent implements OnInit {
  selection: boolean = false;
  gridEdited: boolean = false;
  value = '';
  // columnApi: any;
  gridOptions: GridOptions;
  candidates: CandidateModel[];
  candidate: CandidateModel;

  columnDefs = [
    { field: 'candidate_Person.person_Name', headerName: 'Nombre', colId: "0", width: 400, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams},
    { field: 'candidate_Desired_Job.job_Name', headerName: 'Puesto Deseado', colId: "1", width: 300},
    { field: 'candidate_Desired_Salary', headerName: 'Salario Deseado', colId: "2", width: 225, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams, valueFormatter: DataGridFunctions.currencyFormatter},
    { field: 'candidate_Recommender_Employee', headerName: 'Recomendado por', colId: "3", width: 375, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams},
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
    { field: "candidate_Id", colId: "7", hide: true },
  ];

  defaultColDef = {
    resizable: true,
    editable: false,
    singleClickEdit: true, enableCellChangeFlash: true, suppressMovable: true,
  }

  rowData: any = [];

  constructor(
    private candidateService: CandidateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.candidateService.getCandidates().subscribe((res) => {
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
    if (this.gridOptions.api.getValue("6", node) != "New") {
      node.setDataValue("6", "true");
    }
  }
}
