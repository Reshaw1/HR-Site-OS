import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { MatCardModule } from '@angular/material/card'

import { AgGridModule } from "ag-grid-angular";
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { ManageCandidatesComponent } from './manage-candidates/manage-candidates.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { ManageLanguajesComponent } from './manage-languajes/manage-languajes.component';
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';
import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';
import { JobRiskLevelComponent } from './cell-renderer/job-risk-level/job-risk-level.component';
import { DepartmentComponent } from './cell-renderer/department/department.component';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavBarComponent,
    CreateCandidateComponent,
    ManageCandidatesComponent,
    ManageEmployeesComponent,
    ManageLanguajesComponent,
    ManageDepartmentsComponent,
    ManageJobsComponent,
    JobRiskLevelComponent,
    DepartmentComponent,
    ViewCandidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
