import { Component, computed, inject, OnInit } from '@angular/core';
import { LogsService } from '../../services/logs.service';
import { Data, FormFieldBase, LogResponse } from '../../models/api-logs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CardModule,ButtonModule,
    CommonModule,TableModule,ToolbarModule,
    DialogModule,
    ReactiveFormsModule,PanelModule,
    FormsModule,
    ConfirmDialog],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent  implements OnInit{
 
  logs : LogResponse[] = [];
  private logService = inject(LogsService);
  private formBuilder = inject(FormBuilder);
 formFields: FormFieldBase[] = [
  
  { name: 'title',
     label: 'Title', 
     type: 'text',
      required: true, 
      placeholder: 'Enter title' },
  { name: 'name',
     label: 'Name', type: 'text', required: false, placeholder: 'Enter name' },
  { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Enter email' },
  { name: 'body', label: 'Body', type: 'text', required: true, placeholder: 'Enter body' }
];

  formLog!:FormGroup
  isEdit : boolean = false;
  logDialog: boolean= false;
  selectedLog: any = null;
  public constructor(private confirmationService: ConfirmationService){
    
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
  this.initForm();
  this.isEdit= false;
  this.logDialog = true;

 }

getGroupKeys(group: AbstractControl): string[] {
  return Object.keys((group as FormGroup).controls);
}

createFormGroupFromObject(obj: any): FormGroup {
  const groupFields: { [key: string]: any } = {};

  this.formFields.forEach(field => {
    const validators = [];
    if (field.type === 'email') {
      validators.push(Validators.email);
    }

    groupFields[field.name] = [obj[field.name] ?? '', validators];
  });

  return this.formBuilder.group(groupFields);
}


 edit(log:LogResponse){
    console.log('EDITANDO LOG:', log); 
  this.isEdit= true;
  const dataArray = this.formLog.get('data') as FormArray;
  dataArray.clear();
  if (Array.isArray(log.data)) {
    log.data.forEach(item => {
      const group = this.createFormGroupFromObject(item);
      dataArray.push(group);
    });
  } else {
    console.warn("log.data no es un array o está vacío", log.data);
  }

  // Asignar método
  this.formLog.patchValue({
    method: log.method
  });

  this.logDialog = true;
 }



  private initForm(){
   this.formLog = this.formBuilder.group({
      method:['',[Validators.required]],
      data: this.formBuilder.array([])
        
    })
  }
get dataControls(): FormArray {
  return this.formLog.get('data') as FormArray;
}
addData() {
  const group = this.createFormGroupFromObject({});
  this.dataControls.push(group);
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
 confirmDelete(log: LogResponse): void {
  this.confirmationService.confirm({
    message: '¿Estás seguro de que deseas eliminar este log?',
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí',
    rejectLabel: 'No',
    accept: () => {
      this.logService.delete(log); 
    }
  });
}

  refresh(){
    this.logService.refreshLogs();
  }

  getLabel(key: string): string {
  const field = this.formFields.find(f => f.name === key);
  return field?.label ?? key;
}

getPlaceholder(key: string): string {
  const field = this.formFields.find(f => f.name === key);
  return field?.placeholder ?? '';
}



}
