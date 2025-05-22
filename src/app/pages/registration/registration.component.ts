import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { LogResponse } from '../../models/api-logs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CardModule,ButtonModule,CommonModule,TableModule,ModalComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent  implements OnInit{
 
  logs : LogResponse[] = [];
  message: string = '';
  modalMode : 'edit' | 'delete' | 'show' = 'edit';
  public constructor(private serviceLogs: LogsService){

  }
   showModal = false;
 
  ngOnInit(): void {
    this.loadLogs();
  }
  loadLogs(){
    this.serviceLogs.getLogs().subscribe({
      next: (respose) => {
        this.logs = respose;
        this.message = "Datos recuperados";
        console.log("logs recuperados de manera exitosa");
      },
      error:(err)=> {
        this.message= "Error al recuperar los logs";
          console.error("error al recupear logs",err);
      },
    })
  }

  showEdit(){
    this.modalMode ='edit';
    this.showModal = true;

  }

  showDelete(){

  }
  deleteLog(id:number){
    this.serviceLogs.delete(id).subscribe({
      next: (res) => {
        console.log("log eliminado exitosamente");
      },
      error:(err) =>{
        console.error("error al eliminar log",err);
      },
    })

  }
  save(){

  }

  closeModal(){
    this.showModal= false;
  }

}
