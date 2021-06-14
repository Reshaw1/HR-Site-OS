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

  createJob(job: JobModel): Observable<any> {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(job)))
  }

  deleteJob(id: number) {
    return this.httpClient.delete(this.baseUrl + "/" + id)
  }

  updateJob(job: JobModel, id: number) {
    return this.httpClient.put(this.baseUrl + "/" + id , JSON.parse(JSON.stringify(job)))
  }
}
