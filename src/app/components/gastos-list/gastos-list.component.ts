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
  pagosService = inject(PagosService)
  spents: Iactivity[] = [] 


  constructor(private modalService: NgbModal) { }

  ngOnInit(){
    this.getSpents()
  }
  
//PARA ABRIR EL FORM CON EL BOTON
  async getSpents(): Promise<void> {
  console.log(await this.pagosService.getAll())

   this.spents = await this.pagosService.getAll()


  }



  openGastosModal() {
    const modalRef = this.modalService.open(CrearGastosComponent);
    modalRef.componentInstance.spentCreated.subscribe(async () => {
     await this.getSpents()
    
    });
  }


}
