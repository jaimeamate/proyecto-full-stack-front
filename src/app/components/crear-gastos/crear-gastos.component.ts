import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-crear-gastos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-gastos.component.html',
  styleUrl: './crear-gastos.component.css'
})

export class CrearGastosComponent {
  @Output() spentCreated = new EventEmitter<void>();

  spentsForm: FormGroup;
  pagosService = inject(PagosService)
  groupService = inject(GroupService)
  router = inject(Router)
  activateRoute = inject(ActivatedRoute)


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

  ngOnInit(): void {


  }

     getDataForm(): void {
     
  }

  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.spentsForm.get(formControlName)?.hasError(validador) && this.spentsForm.get(formControlName)?.touched
  }


}

 
  

