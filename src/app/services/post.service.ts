import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { environment } from '../environments/environmet';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }
  

  getPost(id:number):Observable<Post[]>{
    return this.http.get<Post[]>(`${this.BASE_URL}/posts/user/${id}`)

  }
}
