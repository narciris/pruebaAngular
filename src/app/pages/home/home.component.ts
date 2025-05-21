import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CardModule } from 'primeng/card';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [ModalComponent,DialogModule,CommonModule,ButtonModule,CardModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public constructor(private service: PostService, private userService: UserService) {

  }
  ngOnInit(): void {
    this.getUsers();
  }
  post: Post[] = [];
  users: User[] = [];


  showPostModal = false;
 

  openModal(){
    this.showPostModal = true;
  }

  closeModal(){
    this.showPostModal= false;
  }

  getPost(id:number){
    this.service.getPost(id).subscribe({
      next: (respose) => {
    
        this.post = respose;
        this.openModal(); 
        console.log("datos recuperdados de manera exitosa");
      },
      error: (err) => {
        console.error("error al obtener datos", err);
      }
    })
  }
  getUsers(){
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log("usuarios recuperados exitosamente");
      },
      error:(err) => {
          console.log("error al recuperar usuarios");
      },
      
    })
  }

}
