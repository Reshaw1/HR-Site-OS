import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobModel } from '../models/Job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl: string = "http://localhost:8080/api/job"

  constructor(private httpClient: HttpClient) { }

  getJobs()
  : Observable<JobModel[]>
  {
    return this.httpClient.get<JobModel[]>(this.baseUrl, {responseType: 'json'});
  }

  getJobById(id: number) : Observable<JobModel>
  {
    return this.httpClient.get<JobModel>(this.baseUrl + "/" + id, {responseType: 'json'});
  }
}
