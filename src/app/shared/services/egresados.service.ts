import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Egresado, Idioma } from '../interfaces/egresado.interface';
import { Observable } from 'rxjs';
import { JSON_SERVER_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class EgresadosService {
  egresado_relationships = '_embed=educacion&_embed=contacto&_embed=nacionalidadEgresado&_embed=idiomaEgresado&_embed=experienciaLaboralEgresado&_embed=egresadosHabilidad'
  
  constructor(private http: HttpClient) { }

  getEgresados(): Observable<Egresado[]> {
    return this.http.get<Egresado[]>(`${JSON_SERVER_URL}/egresado?${this.egresado_relationships}`)
  }

  getEgresadoById(id: number): Observable<Egresado> {
    return this.http.get<Egresado>(`${JSON_SERVER_URL}/egresado/${id}?${this.egresado_relationships}`);
  }

  updateEgresado(egresado: Egresado): Observable<Egresado> {
    return this.http.patch<Egresado>(`${JSON_SERVER_URL}/egresado/${egresado.id}`, egresado);
  }

  addIdiomaEgresado(idioma: Idioma): Observable<Idioma> {
    return this.http.post<Idioma>(`${JSON_SERVER_URL}/idiomaEgresado`, idioma);
  }

  removeIdiomaEgresado(idiomaId: number): Observable<Idioma> {
    return this.http.delete<Idioma>(`${JSON_SERVER_URL}/idiomaEgresado/${idiomaId}`);
  }

}
