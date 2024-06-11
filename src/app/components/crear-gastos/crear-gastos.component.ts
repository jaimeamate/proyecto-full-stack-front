import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
    

  constructor(public activeModal: NgbActiveModal) { 
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

  // getDataForm(): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     if (this.spentsForm.valid) {
  //       const { name, amount, date } = this.spentsForm.value;
  //       const idGroup = this.groupService.getCurrentGroupId(); // assuming this method exists
  //       const type = 'someType'; // assuming you have a type

  //       this.pagosService.insert({ name, amount, date, idGroup, type }).then(() => {
  //         this.spentCreated.emit();
  //         this.activeModal.close();
  //         resolve();
  //       }).catch((error) => {
  //         console.error(error);
  //         reject(error);
  //       });
  //     } else {
  //       reject(new Error('Form is invalid'));
  //     }
  //   });
  // }
  
  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.spentsForm.get(formControlName)?.hasError(validador) && this.spentsForm.get(formControlName)?.touched
  }


}

 
  

