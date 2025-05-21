import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environmet';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  private BASE_URL = environment.BASE_URL;

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.BASE_URL}/users`)
  }
}
