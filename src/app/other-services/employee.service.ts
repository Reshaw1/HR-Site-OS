import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = "http://localhost:8080/api/employee"

  constructor(private httpClient: HttpClient) { }

  getEmployees()
  : Observable<EmployeeModel[]>
  {
    return this.httpClient.get<EmployeeModel[]>(this.baseUrl, {responseType: 'json'});
  }

  getEmployeeById(id: number) : Observable<EmployeeModel>
  {
    return this.httpClient.get<EmployeeModel>(this.baseUrl + "/" + id, {responseType: 'json'});
  }

  createEmployee(employee: EmployeeModel): Observable<any> {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(employee)))
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete(this.baseUrl + "/" + id)
  }

  updateEmployee(employee: EmployeeModel, id: number) {
    return this.httpClient.put(this.baseUrl + "/" + id , JSON.parse(JSON.stringify(employee)))
  }
}
