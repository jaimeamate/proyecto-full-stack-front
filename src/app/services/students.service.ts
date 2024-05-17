import { Injectable } from '@angular/core';
import { IStudent } from '../interfaces/istudent.interface';
import { ALUMNOS } from '../db/students.db';
import { Icourse } from '../interfaces/icourse.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  
  private arrAlumnos: IStudent[] = ALUMNOS
  private arrCurso: Icourse[]=[
    {title: '1ESO', value: '1eso'},
    {title: '2ESO', value: '2eso'},
    {title: '3ESO', value: '3eso'},
    {title: '4ESO', value: '4eso'},
    {title: '5ESO', value: '5eso'},
    {title: '6ESO', value: '6eso'},
    {title: '7ESO', value: '7eso'},
    {title: '8ESO', value: '8eso'},
  ]

  private id: number = 4;

  getAllCourses(): Icourse[]{
    return this.arrCurso;
  }

  filterByCourse(course: string): IStudent[]{
    return this.arrAlumnos.filter(alumno => alumno.curso.includes(course)) //para que cundo le des seleccionar un curso salga tdo
  }

  //getter, da valores de variables. con este metodo te dejo cpnsultar todo
  // los array de student
  getAll(): IStudent[]{
    return this.arrAlumnos;
  }

  //getter. me devuelve los alumnos por ID
  getById(id: number): IStudent | undefined {
    return this.arrAlumnos.find( student => student.id ===id)
  }

  insert(alumno: IStudent): string {
    alumno.id =this.id
    let posicion = this.arrAlumnos.findIndex(student => student.email === alumno.email)
    if (posicion === -1){

    let longitud = this.arrAlumnos.push(alumno)//una peticion a la Base de
    this.id++;
    return (longitud) ? 'EL alumno se a registrado correctamente' : 'no se ha registrado correctamente'

     }else{ 
      return 'alumno duplicado'
  
  }
  }
    
  
}
