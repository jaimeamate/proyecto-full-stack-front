import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UsuariosService } from './services/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pay Shared';
  user: any = this.authService.getUserData()

  constructor(private router: Router, public authService: AuthService, public userService: UsuariosService) {
  }
  async ngOnInit() {
    console.log(this.user)
    this.user = await this.userService.getUserById(this.user.user_id)
    console.log(this.user)
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/register'], { queryParams: { mode: 'update' } });
  }
}
