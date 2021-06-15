import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from "@ag-grid-community/angular";
import {
  IAfterGuiAttachedParams,
  ICellRendererParams,
} from "@ag-grid-community/all-modules";
import { DepartmentService } from 'src/app/other-services/department.service';
import { DepartmentModel } from 'src/app/models/Department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements AgRendererComponent {

  public cellRendererParams: ICellRendererParams;
  departments: DepartmentModel[]
  department_name: string
  department_id: number

  constructor(private departmentService: DepartmentService) {}

  refresh(params: ICellRendererParams): boolean {
    console.log("refresh");
    return true;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error("Method not implemented.");
  }

  agInit(params: ICellRendererParams): void {
    this.cellRendererParams = params;
    this.departmentService.getDepartments().subscribe(res => {
      this.departments = res;
    });
    this.department_name = params.value;
  }

  onSelectionChanged($event) {
    this.cellRendererParams.setValue(this.department_name);
    for (let department of this.departments) {
      if (department.department_Name == this.department_name) {
        this.department_id = department.department_Id;
        break
      }
    }
    console.log(this.department_id)
    this.cellRendererParams.node.setDataValue("9", this.department_id);
  }
}
