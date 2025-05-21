import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { LogResponse } from '../../models/api-logs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CardModule,ButtonModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent  implements OnInit{
 
  logs : LogResponse[] = [];
  message: string = '';
  public constructor(private serviceLogs: LogsService){

  }
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

}
