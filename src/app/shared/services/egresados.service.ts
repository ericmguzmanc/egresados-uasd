import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Contacto, Educacion, Egresado, EgresadosHabilidad, ExperienciaLaboral, Idioma } from '../interfaces/egresado.interface';
import { Observable, map } from 'rxjs';
import { JSON_SERVER_URL } from '../constants';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class EgresadosService {

  egresado_relationships = '_embed=educacion&_embed=contacto&_embed=nacionalidadEgresado&_embed=idiomaEgresado&_embed=experienciaLaboralEgresado&_embed=egresadosHabilidad'
 
  constructor(
    private http: HttpClient,
    private helperService: HelperService,
  ) { }

  getEgresados(page?: number): Observable<Egresado[]> {
    return this.http.get<Egresado[]>(`${JSON_SERVER_URL}/egresado?_page=${page}?${this.egresado_relationships}`);
  }

  getEgresadoById(id: number): Observable<Egresado> {
    return this.http.get<Egresado>(`${JSON_SERVER_URL}/egresado/${id}?${this.egresado_relationships}`)
      .pipe(
        map((egresado) => {
          egresado.experienciaLaboralEgresado = this.helperService
            .sortByDate(egresado.experienciaLaboralEgresado, 'FechaEntr', 'FechaEntr');

          egresado.educacion = this.helperService
            .sortByDate(egresado.educacion, 'FechaEntr', 'FechaSal');

          return egresado;
        })
      );
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

  addHabilidadEgresado(habilidad: EgresadosHabilidad): Observable<EgresadosHabilidad> {
    return this.http.post<EgresadosHabilidad>(`${JSON_SERVER_URL}/egresadosHabilidad`, habilidad);
  }

  removeHabilidadEgresado(egresadosHabilidadId: number): Observable<Idioma> {
    return this.http.delete<EgresadosHabilidad>(`${JSON_SERVER_URL}/egresadosHabilidad/${egresadosHabilidadId}`);
  }

  addContactoEgresado(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(`${JSON_SERVER_URL}/contacto`, contacto);
  }

  deleteContactoEgresado(contactoId: number): Observable<Contacto> {
    return this.http.delete<Contacto>(`${JSON_SERVER_URL}/contacto/${contactoId}`);
  }

  addExperienciaLaboralEgresado(experienciaLaboral: ExperienciaLaboral): Observable<ExperienciaLaboral> {
    return this.http.post<ExperienciaLaboral>(`${JSON_SERVER_URL}/experienciaLaboralEgresado`, experienciaLaboral);
  }

  deleteExperienciaLaboralEgresado(experienciaLaboralId: number) {
    return this.http.delete<ExperienciaLaboral>(`${JSON_SERVER_URL}/experienciaLaboralEgresado/${experienciaLaboralId}`);
  }

  addEducacionEgresado(educacion: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(`${JSON_SERVER_URL}/educacion`, educacion);
  }

  deleteEducacionEgresado(educacionId: number): Observable<Educacion> {
    return this.http.delete<Educacion>(`${JSON_SERVER_URL}/educacion/${educacionId}`);
  }
}
