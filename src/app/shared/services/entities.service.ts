import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Contacto, EgresadosHabilidad, Idioma } from '../interfaces/egresado.interface';
import { Observable, map } from 'rxjs';
import { Carrera } from '../interfaces/carrera.interface';
import { Provincia } from '../interfaces/provincia.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  JSON_SERVER_URL = environment.json_server_url;

  constructor(private http: HttpClient) { }

  getIdiomas(): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(`${this.JSON_SERVER_URL}/idioma?_sort=idioma`);
  }

  getHabilidades(): Observable<EgresadosHabilidad[]> {
    return this.http.get<EgresadosHabilidad[]>(`${this.JSON_SERVER_URL}/habilidades?_sort=habilidad`);
  }

  getContactoByTipoAndValor({tipo, valor}: { tipo: string, valor: string}): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(`${this.JSON_SERVER_URL}/contacto/?tipo=${tipo}&valor=${valor}`);
  }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.JSON_SERVER_URL}/carreras?_expand=facultad`)
      .pipe(
        map((carreras) => {
          if (carreras.length > 0) {
            carreras.sort((a, b) => a.facultad.nombre.toUpperCase().localeCompare(b.facultad.nombre.toUpperCase()));
          }
          return carreras;
        })
      );
  }

  getEducacionByEgresadoAndTitle(
    { egresadoId, titulo, tipoTitulo }: { egresadoId: number, titulo: string, tipoTitulo: string}
  ) {
    return this.http.get<Contacto[]>(`${this.JSON_SERVER_URL}/educacion/?egresadoId=${egresadoId}&Titulo=${titulo}&TipoTitulo=${tipoTitulo}`);
  }

  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.JSON_SERVER_URL}/provincias`)
      .pipe(
        map((provincias) => {
          if (provincias.length > 0) {
            provincias.sort((a, b) => a.provincia.toUpperCase().localeCompare(b.provincia.toUpperCase()));
          }
          return provincias;
        })
      );
  }
}