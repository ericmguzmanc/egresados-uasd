import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { EgresadosHabilidad, Idioma } from '../interfaces/egresado.interface';
import { Observable } from 'rxjs';
import { JSON_SERVER_URL } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(private http: HttpClient) { }

  getIdiomas(): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(`${JSON_SERVER_URL}/idioma?_sort=idioma`)
  }

  getHabilidades(): Observable<EgresadosHabilidad[]> {
    return this.http.get<EgresadosHabilidad[]>(`${JSON_SERVER_URL}/habilidades?_sort=habilidad`)
  }
}