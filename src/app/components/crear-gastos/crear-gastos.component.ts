import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Iactivity } from '../../interfaces/iactivity';
import { PagosService } from '../../services/pagos.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-gastos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-gastos.component.html',
  styleUrl: './crear-gastos.component.css'
})

export class CrearGastosComponent {
  @Output() spentCreated = new EventEmitter<void>();

  pagosService = inject(PagosService)
  router = inject(Router)

  newActivity: Iactivity = {
    "name": '',
    "type": '',
    "amount": 0,
    "date": new Date().toISOString(),
    "idGroup": 0
  };
    
  constructor(public activeModal: NgbActiveModal) { }
    
    createSpent(form: NgForm): void {
    this.newActivity.name.trim()
    this.pagosService.insert(this.newActivity).then(response => {
    form.resetForm()
    this.spentCreated.emit();
    this.activeModal.close();
  });
}
}
