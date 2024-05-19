import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icourse } from '../../interfaces/icourse.interface';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

  @Output() cursoSeleccionado: EventEmitter<string> = new EventEmitter()

  cursos: Icourse[] = [];
  studentSevices = inject(StudentsService)


  ngOnInit(){
    this.cursos = this.studentSevices.getAllCourses();
  }

  getDataFilter(form: any): void{
    //form.value.curso
    //el valor del curso de lo tengo que enviar a student list para que filtre su array de alimnos en funcion de ese curso.
    //como es al padre le metemos un outpu

    this.cursoSeleccionado.emit(form.value.curso);
  }

}
