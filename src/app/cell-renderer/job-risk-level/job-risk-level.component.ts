import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from "@ag-grid-community/angular";
import {
  IAfterGuiAttachedParams,
  ICellRendererParams,
} from "@ag-grid-community/all-modules";
@Component({
  selector: 'app-job-risk-level',
  templateUrl: './job-risk-level.component.html',
  styleUrls: ['./job-risk-level.component.css']
})
export class JobRiskLevelComponent  implements AgRendererComponent {
  public cellRendererParams: ICellRendererParams;
  riskLevel: number;
  riskLevels = [
    {
      risk_Id: 1,
      risk_Name: "Bajo"
    },
    {
      risk_Id: 2,
      risk_Name: "Medio"
    },
    {
      risk_Id: 3,
      risk_Name: "Alto"
    },
];

  constructor() {}

  refresh(params: ICellRendererParams): boolean {
    console.log("refresh");
    return true;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error("Method not implemented.");
  }

  agInit(params: ICellRendererParams): void {
    this.cellRendererParams = params;
    this.riskLevel = params.value;
  }

  onSelectionChanged($event) {
    this.cellRendererParams.setValue(this.riskLevel);
  }
}
