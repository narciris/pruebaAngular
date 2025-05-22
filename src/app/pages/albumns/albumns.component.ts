import { Component, computed, inject } from '@angular/core';
import { AlbumnsService } from '../../services/albumns.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-albumns',
  imports: [CardModule],
  templateUrl: './albumns.component.html',
  styleUrl: './albumns.component.css'
})
export class AlbumnsComponent {

  private service = inject(AlbumnsService)

  succesMessage = this.service.successMessage;
  errorsMessage = this.service.errorMessage;
  albumns = this.service.albums;
  selectUserId = this.service.selectedUserId;

  total = computed(() => this.service.albums().length);
  
  showAlbum(userId:number){

  }

}
