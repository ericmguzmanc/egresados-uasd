import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Contacto, DireccionEgresado, Educacion, Egresado, EgresadosHabilidad, ExperienciaLaboral, Idioma } from '../interfaces/egresado.interface';
import { Observable, map } from 'rxjs';
import { HelperService } from './helper.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EgresadosService {

  egresado_relationships = '_embed=educacion&_embed=contacto&_embed=nacionalidadEgresado&_embed=idiomaEgresado&_embed=experienciaLaboralEgresado&_embed=egresadosHabilidad&_embed=direccionEgresado'
  JSON_SERVER_URL = environment.json_server_url;

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
  ) { }

  getEgresados(page?: number): Observable<Egresado[]> {
    return this.http.get<Egresado[]>(`${this.JSON_SERVER_URL}/egresado?_page=${page}?${this.egresado_relationships}`);
  }

  getEgresadoById(id: number): Observable<Egresado> {
    return this.http.get<Egresado>(`${this.JSON_SERVER_URL}/egresado/${id}?${this.egresado_relationships}`)
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
    return this.http.patch<Egresado>(`${this.JSON_SERVER_URL}/egresado/${egresado.id}`, egresado);
  }

  addIdiomaEgresado(idioma: Idioma): Observable<Idioma> {
    return this.http.post<Idioma>(`${this.JSON_SERVER_URL}/idiomaEgresado`, idioma);
  }

  removeIdiomaEgresado(idiomaId: number): Observable<Idioma> {
    return this.http.delete<Idioma>(`${this.JSON_SERVER_URL}/idiomaEgresado/${idiomaId}`);
  }

  addHabilidadEgresado(habilidad: EgresadosHabilidad): Observable<EgresadosHabilidad> {
    return this.http.post<EgresadosHabilidad>(`${this.JSON_SERVER_URL}/egresadosHabilidad`, habilidad);
  }

  removeHabilidadEgresado(egresadosHabilidadId: number): Observable<Idioma> {
    return this.http.delete<EgresadosHabilidad>(`${this.JSON_SERVER_URL}/egresadosHabilidad/${egresadosHabilidadId}`);
  }

  addContactoEgresado(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(`${this.JSON_SERVER_URL}/contacto`, contacto);
  }

  deleteContactoEgresado(contactoId: number): Observable<Contacto> {
    return this.http.delete<Contacto>(`${this.JSON_SERVER_URL}/contacto/${contactoId}`);
  }

  addExperienciaLaboralEgresado(experienciaLaboral: ExperienciaLaboral): Observable<ExperienciaLaboral> {
    return this.http.post<ExperienciaLaboral>(`${this.JSON_SERVER_URL}/experienciaLaboralEgresado`, experienciaLaboral);
  }

  deleteExperienciaLaboralEgresado(experienciaLaboralId: number) {
    return this.http.delete<ExperienciaLaboral>(`${this.JSON_SERVER_URL}/experienciaLaboralEgresado/${experienciaLaboralId}`);
  }

  addEducacionEgresado(educacion: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(`${this.JSON_SERVER_URL}/educacion`, educacion);
  }

  deleteEducacionEgresado(educacionId: number): Observable<Educacion> {
    return this.http.delete<Educacion>(`${this.JSON_SERVER_URL}/educacion/${educacionId}`);
  }

  addDireccionEgresado(direccionEgresado: DireccionEgresado): Observable<DireccionEgresado> {
    return this.http.post<DireccionEgresado>(`${this.JSON_SERVER_URL}/direccionEgresado`, direccionEgresado);
  }

  updateDireccionEgresado(direccionEgresado: DireccionEgresado): Observable<DireccionEgresado> {
    return this.http.patch<DireccionEgresado>(`${this.JSON_SERVER_URL}/direccionEgresado/${direccionEgresado.id}`, direccionEgresado);
  }
}
