import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environmet';
import { Observable } from 'rxjs';
import { LogResponse } from '../models/api-logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }
  private BASE_URL = environment.BASE_URL;

  getLogs():Observable<LogResponse[]>{
    return this.http.get<LogResponse[]>(`${this.BASE_URL}/logs`)

  }
  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.BASE_URL}/logs/${id}`);
  }
}
