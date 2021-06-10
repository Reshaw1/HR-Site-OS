import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonModel } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseUrl: string = "http://localhost:8080/api/person"

  constructor(private httpClient: HttpClient) { }

  getPersons()
  : Observable<PersonModel[]>
  {
    return this.httpClient.get<PersonModel[]>(this.baseUrl, {responseType: 'json'});
  }

  getPersonById(id: number) : Observable<PersonModel>
  {
    return this.httpClient.get<PersonModel>(this.baseUrl + "/" + id, {responseType: 'json'});
  }

}
