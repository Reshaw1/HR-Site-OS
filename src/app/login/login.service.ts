import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonModel } from '../models/person';
import { SysUserModel } from '../models/SysUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = "http://localhost:8080/api/sysuser"

  constructor(private httpClient: HttpClient) { }

  getUsers()
  : Observable<SysUserModel[]>
  {
    return this.httpClient.get<SysUserModel[]>(this.baseUrl, {responseType: 'json'});
  }

  createUser(user: SysUserModel): Observable<any> {
    return this.httpClient.post(this.baseUrl, JSON.parse(JSON.stringify(user)))
  }
}
