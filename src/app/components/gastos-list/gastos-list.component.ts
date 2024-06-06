import { Component, Inject, Input, inject } from '@angular/core';
import { GastosCardComponent } from '../gastos-card/gastos-card.component';
import { RouterLink } from '@angular/router';
import { SaldosCardComponent } from '../saldos-card/saldos-card.component';
import { Iactivity } from '../../interfaces/iactivity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearGastosComponent } from '../crear-gastos/crear-gastos.component';
import { PagosService } from '../../services/pagos.service';

@Component({
  selector: 'app-gastos-list',
  standalone: true,
  imports: [GastosCardComponent,RouterLink,SaldosCardComponent],
  templateUrl: './gastos-list.component.html',
  styleUrl: './gastos-list.component.css'
})
export class GastosListComponent {
  listaUsuarios = ['Grupo 1','Grupo 2','Grupo 3','Grupo 4','Grupo 5']
  listaGastos = ['Grupo 1','Grupo 2','Grupo 3','Grupo 4','Grupo 5']

  @Input() myactivity! :Iactivity;
  activityService = Inject(PagosService)
  spent: Iactivity[] = []

  constructor(private modalService: NgbModal) { }

  ngOnInit(){
    this.getSpent()
  }
//PARA ABRIR EL FORM CON EL BOTON
  async getSpent(): Promise<void> {
    this.spent = await this.activityService.getAll()
  }

  openGastosModal() {
    const modalRef = this.modalService.open(CrearGastosComponent);
    modalRef.componentInstance.spentCreated.subscribe(async () => {
     await this.getSpent()
    
    });
  }




}
