import { PercentPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from '../../services/group.service';
import { UsuariosService } from '../../services/user.service';

@Component({
  selector: 'app-edit-members-group',
  standalone: true,
  imports: [PercentPipe,ReactiveFormsModule],
  templateUrl: './edit-members-group.component.html',
  styleUrl: './edit-members-group.component.css'
})
export class EditMembersGroupComponent {
  @Input() members: any;
  @Input() idGroup: number = 0
  groupService = inject(GroupService)
  userService = inject(UsuariosService)
  modalService = inject(NgbModal);
  formulario: FormGroup;

  constructor(){
    this.formulario = new FormGroup({
      // porcenaje: new FormControl(),
    });
  }

  ngOnInit(){
    console.log(this.members)
    console.log(this.members)
    this.members.forEach( (m:any) => {
      this.formulario.addControl(`${m.id}`,new FormControl(
        m.percent,[
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]
      ))
    });
    console.log(this.formulario)
  }

  suma100 = true
  onSubmit(formulario: FormGroup){
    this.suma100 = false;
    console.log(formulario.value)
    let porcentajes = Object.values(formulario.value)
    porcentajes = porcentajes.map((p:any) => {
      return parseFloat(p)
    })
    console.log(porcentajes);
    if(porcentajes.length>0){
      const result = porcentajes.reduce((acc:number,curr:any):number=>{
        return acc + curr;
      },0)
      this.suma100 = result === 100.000000;
    }
    if(this.suma100){
      let body = []
      for (const key in formulario.value){
        body.push({userId:parseInt(key),percent:parseFloat(formulario.value[key])})
      }
      console.log(body);
      // ENVIA PETICION DE PATCH
      this.groupService.updatePorcentajes(this.idGroup,body)
      this.userService.userEmitter.emit()
      this.modalService.dismissAll()
    }
  }
  checkError(field: string, validator: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(validator) && this.formulario.get(field)?.touched;
  }
}
