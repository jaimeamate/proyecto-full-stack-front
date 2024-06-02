import { Component, Input } from '@angular/core';
import { IGroup } from '../../interfaces/igroup';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grupo-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './grupo-item.component.html',
  styleUrl: './grupo-item.component.css'
})
export class GrupoItemComponent {
  @Input() group?: IGroup
}
