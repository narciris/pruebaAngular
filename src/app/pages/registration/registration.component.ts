import { Component, computed, inject, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { LogResponse } from '../../models/api-logs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { User } from '../../models/user';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CardModule,ButtonModule,CommonModule,TableModule,ToolbarModule,DialogModule,
    ReactiveFormsModule,PanelModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent  implements OnInit{
 
  logs : LogResponse[] = [];
  private logService = inject(LogsService);
  private formBuilder = inject(FormBuilder);
  formLog!:FormGroup
  isEdit : boolean = false;
  logDialog: boolean= false;
  detailsDialog: boolean= false;
  selectedLog: any = null;
  public constructor(){
    
  }

  successMessage = this.logService.successMessage;
  errorMessage = this.logService.errorMessage;
  loading = this.logService.loading;
  logsAll = this.logService.logs;

  total = computed(() => this.logService.logs().length);
  selectdLog:LogResponse[] = [];


   showModal = false;
 
  ngOnInit(): void {
    this.refresh();
    this.initForm();
  }
   openNew(){
  this.formLog.reset();
  this.isEdit= false;
  this.logDialog = true;

 }
 detailLog(log:LogResponse){
  this.formLog.reset();
    this.selectedLog = log;
  this.isEdit= false;
  this.detailsDialog = true;
 }

 closeDetailsDialog() {
  this.selectedLog = null;
}

 edit(log:LogResponse){
    console.log('EDITANDO LOG:', log); 
  this.isEdit= true;
  this.formLog.patchValue({
   id: log.id,
  date: log.date,
  method: log.method,
  data: JSON.stringify(log.data)
  });
  this.logDialog = true;
 }



  private initForm(){
   this.formLog = this.formBuilder.group({
      method:['',[Validators.required]],
      data:[[]]    
    })
  }

  save(){
    if(this.formLog.invalid){
      this.formLog.markAllAsTouched();
      console.log("formulario invalido",this.formLog.errors);
      return
    }
    const formValue = this.formLog.value;
    if(this.isEdit){
      console.log("actualizando logs exitosamente");
      this.logService.update(formValue);
    }else{
      console.log("creando nuevo log o registro")
      this.logService.create(formValue);
    }

    this.hidenDialog();
  }

  hidenDialog(){
    this.logDialog = false;
  }
  deleteLog(log:LogResponse){
    this.logService.delete(log);
  
  }

  refresh(){
    this.logService.refreshLogs();
  }

  


}
