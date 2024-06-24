import { PercentPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from '../../services/group.service';
import { UsuariosService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-members-group',
  standalone: true,
  imports: [PercentPipe,ReactiveFormsModule],
  templateUrl: './edit-members-group.component.html',
  styleUrl: './edit-members-group.component.css'
})
export class EditMembersGroupComponent {
  @Input() members: any;
  @Input() user: any;
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
    console.log(this.user)
    this.buildForm()
  }
  buildForm(){
    this.members.forEach( (m:any) => {
      this.formulario.addControl(`${m.id}`,new FormControl(
        m.percent,[
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]
      ))
    });
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
        body.push({userId:parseInt(key),percent:parseFloat(formulario.value[key]).toFixed(2)})
      }
      console.log(body);
      // ENVIA PETICION DE PATCH
      this.groupService.updatePorcentajes(this.idGroup,body)
      this.userService.userEmitter.emit()
      this.modalService.dismissAll()
    }
  }
  checkError(field: number, validator: string): boolean | undefined {
    const fieldStringfied = field.toString()
    return this.formulario.get(fieldStringfied)?.hasError(validator) && this.formulario.get(fieldStringfied)?.touched;
  }
  onMemberDelete(member:any){
    const memberName = `${member.firstName} ${member.lastName}` 
    Swal.fire({
      title: `Are you sure to delete member ${memberName}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.groupService.deleteGroupMembersByIdUser(this.idGroup,member.id)
        Swal.fire({
          title: "Deleted!",
          text: `Member ${memberName} has been deleted.`,
          icon: "success"
        });
        
        this.userService.userEmitter.emit()
        // this.formulario.removeControl(`${member.id}`)
        // this.formulario = new FormGroup({})
        // this.members = this.members.map((m:any)=>{
        //   return m.id !== member.id
        // })
        // this.buildForm()
        this.modalService.dismissAll()
      }
    });
  }
}
