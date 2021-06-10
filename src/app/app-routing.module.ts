import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageCandidatesComponent } from './manage-candidates/manage-candidates.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';

const routes: Routes = [
  { path: "", component: AppComponent, pathMatch: "full" },
  { path: "home", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "create-candidate", component: CreateCandidateComponent },
  { path: "manage-candidates", component: ManageCandidatesComponent },
  { path: "manage-employees", component: ManageEmployeesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
