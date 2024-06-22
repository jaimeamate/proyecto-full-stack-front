import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Iactivity } from '../../interfaces/iactivity';



@Component({
  selector: 'app-crear-gastos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-gastos.component.html',
  styleUrl: './crear-gastos.component.css'
})

export class CrearGastosComponent {
  @Output() close = new EventEmitter<void>();

  @Output() spentCreated = new EventEmitter<void>();
  @Input() idGroup!: number | undefined;
  @Output() payerIdEmitter = new EventEmitter<number>();

  spentsForm: FormGroup;
  pagosService = inject(PagosService)
  groupService = inject(GroupService)
  router = inject(Router)
  activateRoute = inject(ActivatedRoute)
  newSpent: Iactivity[] = []
  members: any[] = [] 

  
  // public activeModal: NgbActiveModal
    

  constructor(){
    this.spentsForm = new FormGroup({
      
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      amount: new FormControl('',[
        Validators.required,
        Validators.minLength(1)

      ]),
      date: new FormControl('',[
        Validators.required,
      ]),
      
      

    }, [])
  }

  ngOnInit(): void {
    this.getMembers();
    
    this.getDataForm();
  }

  async getDataForm() {
    if (this.spentsForm.valid) {
      const newSpent: Iactivity = { ...this.spentsForm.value, idGroup: this.idGroup };
      console.log(this.idGroup) // Cambiado para crear un objeto en lugar de un arreglo
      try {
        await this.pagosService.insert(newSpent).then(Response =>{
          this.spentsForm.reset();
          this.spentCreated.emit();
          this.cerrarModal()
        }); // Pasamos directamente el objeto
        console.log('Gasto creado con éxito');
        this.spentCreated.emit();
        this.spentsForm.reset();
      } catch (error) {
        console.error('Error al crear el gasto', error);
      }
    }
  }

async getMembers(){
  if (this.idGroup !== undefined) {
    this.members = await this.groupService.getGroupMembers(this.idGroup);
  }
}

                     
  cerrarModal() {
    this.close.emit(); // Esto notificará al componente padre
  }

  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.spentsForm.get(formControlName)?.hasError(validador) && this.spentsForm.get(formControlName)?.touched
  }


}
 
  

