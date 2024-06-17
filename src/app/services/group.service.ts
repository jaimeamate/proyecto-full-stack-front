import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { IGroup } from '../interfaces/igroup';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  httpClient = inject(HttpClient)
  urlBase = 'http://localhost:3030/api/group'
  urlMail = 'http://localhost:3030/api/mail/send'

  getAll(): Promise<IGroup[]> {
    return firstValueFrom(
      this.httpClient.get<IGroup[]>(this.urlBase)
    )
  }

  getById(id:number) {
    return firstValueFrom(
      this.httpClient.get<IGroup>(`${this.urlBase}/${id}`)
    )
  }

  updateById({id, name}:IGroup) {
    return firstValueFrom(
      this.httpClient.patch<any>(`${this.urlBase}/${id}`,{name})
    )
  }
  
  deleteById(id:number) {
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.urlBase}/${id}`)
    )
  }

  insertOne(group:IGroup) {
    // let name = group.name
    return firstValueFrom(
      this.httpClient.post<IGroup>(`${this.urlBase}/register`,group)
    )
  }

  sendInputs(payload: { email: string, groupId: number }): Observable<any> {
    console.log(payload);
    return this.httpClient.post(this.urlMail, payload);
  }
}
