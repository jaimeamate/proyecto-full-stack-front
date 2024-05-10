import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //TODO: Meter logica de login , apunte a componente registro y a olvide mi contraseña

  constructor(
   
  ) {}

  ngOnInit(): void {
    
  }

  
}
