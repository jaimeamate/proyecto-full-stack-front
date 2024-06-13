import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  spentsForm: FormGroup;
  pagosService = inject(PagosService)
  groupService = inject(GroupService)
  router = inject(Router)
  activateRoute = inject(ActivatedRoute)
  newSpent: Iactivity = {
    name: "",
    amount: 0,
    date: "",
    idGroup: 0,
    type: ""
  };


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
             
        // Call the appropriate service method to insert the data
        this.pagosService.insert(this.newSpent).then(() => {
          // Emit an event to notify the parent component that the data has been created
          this.spentCreated.emit();
        });
          }
  

  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.spentsForm.get(formControlName)?.hasError(validador) && this.spentsForm.get(formControlName)?.touched
  }


}
 
  

