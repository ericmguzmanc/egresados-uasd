import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Egresado } from '../interfaces/egresado.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EgresadosService {

  json_server_url = 'http://localhost:3006';
  egresado_relationships = '_embed=educacion&_embed=contacto&_embed=nacionalidadEgresado&_embed=idiomaEgresado&_embed=experienciaLaboralEgresado&_embed=habilidades'
  
  constructor(private http: HttpClient) { }

  getEgresados(): Observable<Egresado[]> {
    return this.http.get<Egresado[]>(`${this.json_server_url}/egresado?${this.egresado_relationships}`)
  }

  getEgresadoById(id: number): Observable<Egresado> {
    return this.http.get<Egresado>(`${this.json_server_url}/egresado/${id}?${this.egresado_relationships}`);
  }

}
