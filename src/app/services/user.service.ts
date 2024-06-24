import { EventEmitter, Injectable, Output, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, firstValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  @Output() authEventEmiter: EventEmitter<void | string> = new EventEmitter()
  @Output() userEmitter: EventEmitter<any> = new EventEmitter()

  private authUrl: string = 'http://localhost:3030/api/auth/login';
  private registerUrl: string = 'http://localhost:3030/api/auth/register';
  private usersUrl: string = 'http://localhost:3030/api/user';


  private httpClient = inject(HttpClient);

   // Nuevos métodos para login y registro usando el mismo endpoint
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.httpClient.post<any>(this.authUrl, credentials);
  }

  register(firstName: string, lastName: string, phoneNumber: string, email: string, password: string, ind_baja: number): Observable<any> {
    return this.httpClient.post<any>(this.registerUrl, {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      ind_baja
    });
  }
    // Nuevo método para actualizar el campo ind_baja
    updateUserIndBaja(id: number, indBaja: boolean): Observable<any> {
      return this.httpClient.patch<any>(`${this.usersUrl}/${id}`, { ind_baja: indBaja });
    }

    update(firstName: string, lastName: string, phoneNumber: string, email: string, password: string, ind_baja: number, user_id: number): Observable<any> {
      return this.httpClient.put<any>(`${this.usersUrl}/${user_id}`, {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        ind_baja
      });
    }

    getUserById(id: number){
      return firstValueFrom(
        this.httpClient.get<any>(`${this.usersUrl}/${id}`) 
      ) 
        
    }
    
}
