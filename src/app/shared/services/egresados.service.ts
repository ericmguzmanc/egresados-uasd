import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Egresado } from '../interfaces/egresado.interface';
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

  updateEgresado(id: number): Observable<Egresado> {
    // TODO - finish up this part
    return this.http.patch<Egresado>(`${JSON_SERVER_URL}/egresado/${id}?${this.egresado_relationships}`, {});
  }

}
