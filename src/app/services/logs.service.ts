import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../environments/environmet';
import { Observable } from 'rxjs';
import { LogResponse } from '../models/api-logs';
import { StateLogs } from '../signals/state-logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor() { }
   private http = inject(HttpClient);
  private BASE_URL = environment.BASE_URL;
  private messageTimeoutId: any | null = null;
  _state = signal<StateLogs>({
     loading: true,
     logs: [],
     errorMessage: null,
     succesMesagge: null,
     selected: null
  }) 

  logs = computed(() => this._state().logs);
  loading= computed(()=> this._state().loading);
  errorMessage = computed(()=> this._state().errorMessage);
  successMessage = computed(()=> this._state().succesMesagge);
  selected = computed(()=> this._state().selected);



   private clearMessagesAfterDelay(): void {
    if (this.messageTimeoutId) {
      clearTimeout(this.messageTimeoutId);
    }
    
    this.messageTimeoutId = setTimeout(() => {
      this._state.update((state) => ({
        ...state,
        errorMessage: null,
        succesMesagge: null
      }));
      this.messageTimeoutId = null;
    }, 3000); // 3 segundos
  }

  refreshLogs():void{
    this._state.update((state)=>({
      ...state,
      loading: true,
      errorMessage: null

    }));
    
          this.http.get<LogResponse[]>(`${this.BASE_URL}/logs`).subscribe( {
            next: (response)=>{
              this._state.update((state)=> ({
                ...state,
                loading: false,
                succesMesagge: `data recuperada exitosamente`,
               logs: response,
                errorMessage:null
              }))
              console.log(response);
              this.clearMessagesAfterDelay();

            },
            error:(err) =>{
                this._state.update((state)=>({
                  ...state,
                  loading:false,
                  errorMessage:  `Error al obtner logs ${err}` 
                }))
             this.clearMessagesAfterDelay();

            },
          })

  }

  delete(log:LogResponse){
    
    this.http.delete<void>(`${this.BASE_URL}/logs/${log.id}`).subscribe({
      next: (response) =>{
        this._state.update((state)=>({
          ...state,
          logs: state.logs .filter(l => l.id !== log.id),
          succesMesagge: "DAtos borrados exitosamente",

        }))
        this.clearMessagesAfterDelay();

      },
      error:(err) =>{
          this._state.update((state)=>({
            ...state,
            loading: false,
            errorMessage: `ERror al eliminar un log ${err}`
          }))
    this.clearMessagesAfterDelay();

      },
    })
  }

  create(log:LogResponse){
   this.http.post<LogResponse>(`${this.BASE_URL}/logs`,log).subscribe({
    next: (newLog) =>{
      this._state.update((state)=>({
        ...state,
        logs: [...state.logs, newLog],
        succesMesagge: "log creado exitosamente"

      }))
   this.clearMessagesAfterDelay();

    },
    error:(err)=> {
        this._state.update((state)=> ({
          ...state,
          errorMessage: `Error al crear log o peticion ${err}`
        }))
     this.clearMessagesAfterDelay();

    },
   })
  }

  update(log:LogResponse){
   this.http.patch<LogResponse>(`${this.BASE_URL}/logs/${log.id}`,log).subscribe({
    next: (logUpdated) =>{
      this._state.update((state)=> ({
        ...state,
        logs: state.logs.map(l=> l.id === logUpdated.id ? logUpdated: l ),
        succesMesagge:"PEticon actualizada correctamente"
     
      }))
   this.clearMessagesAfterDelay();

    }, error:(err)=>{
      this._state.update((state)=>({
        ...state,
        errorMessage: `Error al actualzar una peticion o log ${err}`
      }));
     this.clearMessagesAfterDelay();

    }
   })
  }

}
