import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
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
  @Output() spentCreated = new EventEmitter<void>();
  @Input() idGroup!: number ;

  spentsForm: FormGroup;
  pagosService = inject(PagosService)
  groupService = inject(GroupService)
  router = inject(Router)
  activateRoute = inject(ActivatedRoute)
  newSpent: Iactivity[] = []

  
  // public activeModal: NgbActiveModal
    

  constructor(){
    this.spentsForm = new FormGroup({
      
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
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

  ngonInit(): void {
    this.getDataForm();
  }

  async getDataForm() {
    if (this.spentsForm.valid) {
      const newSpent: Iactivity = { ...this.spentsForm.value, idGroup: this.idGroup };
      console.log(this.idGroup) // Cambiado para crear un objeto en lugar de un arreglo
      try {
        await this.pagosService.insert(newSpent); // Pasamos directamente el objeto
        console.log('Gasto creado con éxito');
        this.spentCreated.emit();
        this.spentsForm.reset();
      } catch (error) {
        console.error('Error al crear el gasto', error);
      }
    }
  }

  // async getDataForm() {
  //   console.log(this.idGroup)
  //   console.log(this.spentsForm.value)
  //   this.newSpent= { ...this.newSpent, ...this.spentsForm.value  };
  //   console.log(this.newSpent)
  //   if (this.spentsForm.valid) {
  //     // this.newSpent = { ...this.newSpent, ...this.spentsForm.value, idGroup: this.idGroup };
  //     try {
  //       await this.pagosService.insert(this.newSpent);
  //       console.log('Gasto creado con éxito');
  //       this.spentsForm.reset();
        
  //     } catch (error) {
  //       console.error('Error al crear el gasto', error);
  //     }
  //   }
  // }
             
      
  

  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.spentsForm.get(formControlName)?.hasError(validador) && this.spentsForm.get(formControlName)?.touched
  }


}
 
  

