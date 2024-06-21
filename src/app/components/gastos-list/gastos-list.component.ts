import { Component, Inject, Input, SimpleChange, SimpleChanges, TemplateRef, ViewChild, inject } from '@angular/core';
import { GastosCardComponent } from '../gastos-card/gastos-card.component';
import { RouterLink } from '@angular/router';
import { SaldosCardComponent } from '../saldos-card/saldos-card.component';
import { Iactivity } from '../../interfaces/iactivity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearGastosComponent } from '../crear-gastos/crear-gastos.component';
import { PagosService } from '../../services/pagos.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-gastos-list',
  standalone: true,
  imports: [GastosCardComponent,RouterLink,SaldosCardComponent,CrearGastosComponent,DashboardComponent],
  templateUrl: './gastos-list.component.html',
  styleUrl: './gastos-list.component.css'
})
export class GastosListComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any> | undefined;
  pagosService = inject(PagosService)
  spents: Iactivity[] = []
  spentsPayments!: number[]
  allActivities: Iactivity[] = []
  listLoaded: boolean = false

  @Input() idGroup!: number | undefined
  isGastosModalOpen = false;

  constructor(private modalService: NgbModal) { }

  async ngOnInit(): Promise<void> {
    await this.getSpents()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idGroup'] && !changes['idGroup'].isFirstChange()) {
      this.filterSpentsByGroup();
    }
  }

  async getSpents(): Promise<void> {
    this.listLoaded = false
    console.log('Obteniendo todas las actividades');
    this.allActivities = await this.pagosService.getAll();
    this.filterSpentsByGroup();
  }

  filterSpentsByGroup() {
    if (this.idGroup) {
      console.log('Filtrando gastos para el grupo con ID:', this.idGroup);
      this.spents = this.allActivities.filter(activity => activity.idGroup === this.idGroup);
      console.log(this.spents.length)
      console.log(this.spents)
      if(this.spents.length>0){
        this.spentsPayments = this.spents.map((s):number=>{
          return parseFloat(s.amount.toString())
        })
        this.listLoaded = true
      }
      console.log(this.spentsPayments)
      console.log('Gastos filtrados:', this.spents);
    }


  }
//PARA ABRIR EL FORM CON EL BOTON
 

  openGastosModal() {
    this.isGastosModalOpen = true;
    this.modalService.open(this.modalContent);
  }

  async closeGastosModal() {
    this.isGastosModalOpen = false;
    this.modalService.dismissAll()
    await this.getSpents()
  }

  handleFormSubmitted() {
    this.isGastosModalOpen = false;
  }
  async onSpendDeleted() {
    await this.getSpents()
  }

}



  // openGastosModal(idGroup: number) {
  //   const modalRef = this.modalService.open(CrearGastosComponent);
  //   modalRef.componentInstance.spentCreated.subscribe(async () => {
  //    await this.getSpents()
    
  //   });
  // }


// }
