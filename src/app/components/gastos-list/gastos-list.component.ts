import { Component, Inject, Input, SimpleChange, SimpleChanges, inject } from '@angular/core';
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
  allActivities: Iactivity[] = []


  @Input() idGroup!: number

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getSpents()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idGroup'] && !changes['idGroup'].isFirstChange()) {
      this.filterSpentsByGroup();
    }
  }

  async getSpents(): Promise<void> {
    console.log('Obteniendo todas las actividades');
    this.allActivities = await this.pagosService.getAll();
    this.filterSpentsByGroup();
  }

  filterSpentsByGroup() {
    if (this.idGroup) {
      console.log('Filtrando gastos para el grupo con ID:', this.idGroup);
      this.spents = this.allActivities.filter(activity => activity.idGroup === this.idGroup);
      console.log('Gastos filtrados:', this.spents);

    }
  }
//PARA ABRIR EL FORM CON EL BOTON
  // async getSpents(): Promise<void> {
  //  console.log(await this.pagosService.getAll())

  // this.spents = await this.pagosService.getAll()

  // }

  



  openGastosModal() {
    const modalRef = this.modalService.open(CrearGastosComponent);
    modalRef.componentInstance.spentCreated.subscribe(async () => {
     await this.getSpents()
    
    });
  }


}
