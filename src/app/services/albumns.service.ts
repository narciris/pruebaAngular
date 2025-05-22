import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environmet';
import { StateAlbumns } from '../signals/state-albumns';
import { Albumn } from '../models/albumn';

@Injectable({
  providedIn: 'root'
})
export class AlbumnsService {

  private http = inject(HttpClient)
  private BASE_URL = environment.BASE_URL;
  private messageTimeoutId: any = null;
  _state = signal<StateAlbumns>({
       loading: true,
       albumns: [],
       errorMessage: null,
       successMessage: null,
       selectedUserId : null
  })

  albums = computed(() => this._state().albumns);
  loading = computed(() => this._state().loading);
  successMessage = computed(() => this._state().successMessage);
  errorMessage = computed(() => this._state().errorMessage);
  selectedUserId = computed(() => this._state().selectedUserId);

  constructor() { }

  private clearMessagesAfterDelay(): void {
    if (this.messageTimeoutId) {
      clearTimeout(this.messageTimeoutId);
    }
    
    this.messageTimeoutId = setTimeout(() => {
      this._state.update((state) => ({
        ...state,
        errorMessage: null,
        successMessage: null
      }));
      this.messageTimeoutId = null;
    }, 3000);
  }

  refreshAlbums(): void {
    const currentUserId = this._state().selectedUserId;
    if (currentUserId !== null) {
      this.getAlbumnsByUser(currentUserId);
    }
  }

  clearState(): void {
    if (this.messageTimeoutId) {
      clearTimeout(this.messageTimeoutId);
      this.messageTimeoutId = null;
    }
    
    this._state.update(() => ({
      loading: false,
      albumns: [],
      successMessage: null,
      errorMessage: null,
      selectedUserId: null
    }));
  }

  getAlbumnsByUser(id:number){
   
    this.http.get<Albumn[]>(`${this.BASE_URL}/users/${id}/albumns`).subscribe({
      next: (albums) => {
        this._state.update((state)=>({
          ...state,
          loading:false,
          successMessage: "Datos obtenidos exitosamente",
          albumns: albums
        }))
        this.clearMessages();
      },
      error: (err) => {
        this._state.update((state)=> ({
          ...state,
          loading:false,
          errorMessage: err.message || "Error al obtener albums"
        }));
    this.clearMessages();

      } 

    })

  }

  clearMessages(): void {
    if (this.messageTimeoutId) {
      clearTimeout(this.messageTimeoutId);
      this.messageTimeoutId = null;
    }
    
    this._state.update((state) => ({
      ...state,
      errorMessage: null,
      successMessage: null
    }));
  }
}
