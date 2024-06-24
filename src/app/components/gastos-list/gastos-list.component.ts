import { Component, Inject, Input, SimpleChange, SimpleChanges, TemplateRef, ViewChild, inject } from '@angular/core';
import { GastosCardComponent } from '../gastos-card/gastos-card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SaldosCardComponent } from '../saldos-card/saldos-card.component';
import { Iactivity } from '../../interfaces/iactivity';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearGastosComponent } from '../crear-gastos/crear-gastos.component';
import { PagosService } from '../../services/pagos.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GroupService } from '../../services/group.service';
import { JsonPipe } from '@angular/common';
import { UsuariosService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { IGroup } from '../../interfaces/igroup';

@Component({
  selector: 'app-gastos-list',
  standalone: true,
  imports: [GastosCardComponent,RouterLink,SaldosCardComponent,CrearGastosComponent,DashboardComponent],
  templateUrl: './gastos-list.component.html',
  styleUrl: './gastos-list.component.css'
})
export class GastosListComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any> | undefined;
  @Input() user: any
  pagosService = inject(PagosService)
  spents: Iactivity[] = []
  spentsPayments!: number[]
  allActivities: Iactivity[] = []
  listLoaded: boolean = false
  idPayer!: number
  members: any[] = []
  activatedRoute = inject(ActivatedRoute)
  groupLoaded: boolean = false
  router = inject(Router)



  @Input() idGroup!: number
  isGastosModalOpen = false;
  authService = inject(AuthService)
  group!: IGroup
  isAdmin: boolean = false;




  constructor(private modalService: NgbModal, private groupService: GroupService, private userService: UsuariosService) { 
    console.log(this.user)
  }

  async ngOnInit(): Promise<void> {
    await this.getSpents()
    this.userService.userEmitter.subscribe(async()=>{
      await this.getSpents()
    })


    this.activatedRoute.params.subscribe(async (params:any) => {
      const id = params.id
      try {
        this.user = this.authService.getUserData()
          
        this.group = await this.groupService.getById(id)
        this.members = await this.groupService.getGroupMembers(id)
        const [userData] = this.members.filter((m:any) => m.id === this.user.user_id)
       
        this.isAdmin = userData.isAdmin
       
        this.user = userData
        this.groupLoaded = true
      } catch (error) {
        this.router.navigate(['/home'])
      }
    })



  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idGroup'] && !changes['idGroup'].isFirstChange()) {
      this.filterSpentsByGroup();
    }
  }

  async getSpents(): Promise<void> {
    this.listLoaded = false
    this.allActivities = await this.pagosService.getAll(); // Carga todas las actividades (pagos) usando el servicio pagosService
    this.members = await this.groupService.getGroupMembers(this.idGroup) // Carga los miembros del grupo usando el servicio groupService
    this.filterSpentsByGroup(); // Filtra las actividades para obtener solo las del grupo específico
  }

  filterSpentsByGroup() {
    if (this.idGroup) { 
      this.spents = this.allActivities.filter(activity => activity.idGroup === this.idGroup); // Filtra las actividades para obtener solo las del grupo específico
      if(this.spents.length>0){ // Verifica si hay actividades después del filtrado
        this.spentsPayments = this.spents.map((s):number=>{ 
          return parseFloat(s.amount.toString()) // Convierte la cantidad de cada actividad a un número y crea un array con estas cantidades
        })
        this.listLoaded = true // Marca que la lista ha sido cargada
      }
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

  async onSpendUpdate() {
    await this.getSpents()
  }

 
}



 
