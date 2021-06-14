import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateModel } from '../models/Candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  baseUrl: string = "http://localhost:8080/api/candidate"

  constructor(private httpClient: HttpClient) { }

  getCandidates()
  : Observable<CandidateModel[]>
  {
    return this.httpClient.get<CandidateModel[]>(this.baseUrl, {responseType: 'json'});
  }

  createCandidate(candidate: CandidateModel): Observable<any> {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(candidate)))
  }
}
