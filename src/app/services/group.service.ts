import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';
import { IGroup } from '../interfaces/igroup';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  httpClient = inject(HttpClient)
  urlBase = 'http://localhost:3030/api/group'
  urlMail = 'http://localhost:3030/api/mail/send'

  async getAll(userId: number): Promise<IGroup[]> {
    try {
      const groups = await firstValueFrom(
        this.httpClient.get<IGroup[]>(`${this.urlBase}/users/${userId}/group`).pipe(
          catchError(() => of([])) // Devuelve un array vacío si hay un error
        )
      );

      // Si `groups` es null o undefined, devuelve un array vacío
      return groups || [];
    } catch (error) {
      console.error('Error al obtener los grupos:', error);
      return []; // Devuelve un array vacío en caso de excepción
    }
  }

  getById(id:number) {
    return firstValueFrom(
      this.httpClient.get<IGroup>(`${this.urlBase}/${id}`)
    )
  }

  updateById({id, name, description}:IGroup) {
    return firstValueFrom(
      this.httpClient.patch<any>(`${this.urlBase}/${id}`,{name, description})
    )
  }
  
  deleteById(id:number) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.urlBase}/${id}`)
    )
  }

  insertOne(group: IGroup, userId: number) {
    // let name = group.name
    return firstValueFrom(
      this.httpClient.post<IGroup>(`${this.urlBase}/register/${userId}`,group)
    )
  }

  getGroupMembers(idGroup:number){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.urlBase}/${idGroup}/users`)
    )
  }

  deleteGroupMembersByIdUser(idGroup:number ,idUser:number){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.urlBase}/${idGroup}/users`,{"usersOut":[idUser]})
    )
  }

  updatePorcentajes(idGroup: number, body: any): Promise<any>{
    return firstValueFrom(
      this.httpClient.patch<any>(`${this.urlBase}/${idGroup}/users/change`,body)
    )
  }

  deleteAllActivitiesByIdGroup(idGroup: number): Promise<any>{
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.urlBase}/${idGroup}/activity`)
    )
  }

  sendInputs(payload: { email: string, groupId: number }): Observable<any> {
    console.log(payload);
    return this.httpClient.post(`${this.urlBase}/${payload.groupId}/add_user`, payload);
  }
}
