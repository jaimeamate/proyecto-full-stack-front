import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Iactivity } from '../interfaces/iactivity';


@Injectable({
  providedIn: 'root'
})
export class PagosService {
  httpClient = inject(HttpClient);
  urlBase = 'http://localhost:3030/api/activity';


  getAll(): Promise<Iactivity[]> { 
    return firstValueFrom(this.httpClient.get<Iactivity[]>(this.urlBase));
  }

  getById(id: number) :Promise<Iactivity> {
    return firstValueFrom(this.httpClient.get<Iactivity>(`${this.urlBase}/${id}`));
  }

  update(fromValue:Iactivity){
    return lastValueFrom(this.httpClient.put<Iactivity>(`${this.urlBase}/${fromValue.id}`,fromValue));
  }

  delete(id:number){
    return lastValueFrom(this.httpClient.delete<Iactivity>(`${this.urlBase}/${id}`));
  }

  insert(fromValue:Iactivity){
    return lastValueFrom(this.httpClient.post<Iactivity>(this.urlBase,fromValue));
  }
  constructor() { }
}
