import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../models/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl: string = "http://localhost:8080/api/department"

  constructor(private httpClient: HttpClient) { }

  getDepartments()
  : Observable<DepartmentModel[]>
  {
    return this.httpClient.get<DepartmentModel[]>(this.baseUrl, {responseType: 'json'});
  }

  getDepartmentById(id: number) : Observable<DepartmentModel>
  {
    return this.httpClient.get<DepartmentModel>(this.baseUrl + "/" + id, {responseType: 'json'});
  }

  createDepartment(department: DepartmentModel): Observable<any> {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(department)))
  }

  deleteDepartment(id: number) {
    return this.httpClient.delete(this.baseUrl + "/" + id)
  }

  updateDepartment(department: DepartmentModel, id: number) {
    return this.httpClient.put(this.baseUrl + "/" + id , JSON.parse(JSON.stringify(department)))
  }
}
