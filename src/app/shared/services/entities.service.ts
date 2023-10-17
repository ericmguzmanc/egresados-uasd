import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Contacto, EgresadosHabilidad, Idioma } from '../interfaces/egresado.interface';
import { Observable, map } from 'rxjs';
import { JSON_SERVER_URL } from '../constants';
import { Carrera } from '../interfaces/carrera.interface';


@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(private http: HttpClient) { }

  getIdiomas(): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(`${JSON_SERVER_URL}/idioma?_sort=idioma`);
  }

  getHabilidades(): Observable<EgresadosHabilidad[]> {
    return this.http.get<EgresadosHabilidad[]>(`${JSON_SERVER_URL}/habilidades?_sort=habilidad`);
  }

  getContactoByTipoAndValor({tipo, valor}: { tipo: string, valor: string}): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(`${JSON_SERVER_URL}/contacto/?tipo=${tipo}&valor=${valor}`);
  }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${JSON_SERVER_URL}/carreras?_expand=facultad`)
      .pipe(
        map((carreras) => {
          if (carreras.length > 0) {
            carreras.sort((a, b) => {
              const facultadA = a.facultad.nombre.toUpperCase();
              const facultadB = b.facultad.nombre.toUpperCase();
              if (facultadA < facultadB) {
                return -1
              }
  
              if (facultadA > facultadB) {
                return 1
              }
  
              return 0;
            
            });
          }
          return carreras;
        })
      );
  }

  getEducacionByEgresadoAndTitle(
    { egresadoId, titulo, tipoTitulo }: { egresadoId: number, titulo: string, tipoTitulo: string}
  ) {
    return this.http.get<Contacto[]>(`${JSON_SERVER_URL}/educacion/?egresadoId=${egresadoId}&Titulo=${titulo}&TipoTitulo=${tipoTitulo}`);
  }
}