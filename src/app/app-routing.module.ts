import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageCandidatesComponent } from './manage-candidates/manage-candidates.component';
import { ManageDepartmentsComponent } from './manage-departments/manage-departments.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';
import { ManageLanguajesComponent } from './manage-languajes/manage-languajes.component';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';

const routes: Routes = [
  { path: "", component: AppComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "create-candidate", component: CreateCandidateComponent },
  { path: "view-candidate", component: ViewCandidateComponent },
  { path: "manage-candidates", component: ManageCandidatesComponent },
  { path: "manage-employees", component: ManageEmployeesComponent },
  { path: "manage-languajes", component: ManageLanguajesComponent },
  { path: "manage-departments", component: ManageDepartmentsComponent },
  { path: "manage-jobs", component: ManageJobsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
