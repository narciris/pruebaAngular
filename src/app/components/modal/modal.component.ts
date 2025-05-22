import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Post } from '../../models/post';

@Component({
  selector: 'app-modal',
  imports: [DialogModule],
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  
  @Input() visible: boolean = false;
  @Input() title: string='Modal';
  @Input() mode: 'edit' | 'delete'| 'show' = 'show';
  @Output() close = new EventEmitter<void>();

  onHide(){
    this.close.emit();
  }

}
