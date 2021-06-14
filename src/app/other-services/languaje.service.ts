import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguajeModel } from '../models/Languaje';

@Injectable({
  providedIn: 'root'
})
export class LanguajeService {

  baseUrl: string = "http://localhost:8080/api/languaje"

  constructor(private httpClient: HttpClient) { }

  getLanguajes()
  : Observable<LanguajeModel[]>
  {
    return this.httpClient.get<LanguajeModel[]>(this.baseUrl, {responseType: 'json'});
  }

  getLanguajeById(id: number) : Observable<LanguajeModel>
  {
    return this.httpClient.get<LanguajeModel>(this.baseUrl + "/" + id, {responseType: 'json'});
  }

  createLanguaje(languaje: LanguajeModel): Observable<any> {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(languaje)))
  }

  deleteLanguaje(id: number) {
    return this.httpClient.delete(this.baseUrl + "/" + id)
  }

  updateLanguaje(languaje: LanguajeModel, id: number) {
    return this.httpClient.put(this.baseUrl + "/" + id , JSON.parse(JSON.stringify(languaje)))
  }
}
