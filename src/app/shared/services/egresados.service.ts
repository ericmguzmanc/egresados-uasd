import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Contacto, DireccionEgresado, Educacion, Egresado, EgresadosHabilidad, ExperienciaLaboral, Idioma } from '../interfaces/egresado.interface';
import { Observable, map, switchMap } from 'rxjs';
import { HelperService } from './helper.service';
import { environment } from 'src/environments/environment';
import { egresadosFilters } from '../interfaces/egresadosFilters.interface';
import { StorageService } from './storage.service';
import { RolUsuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class EgresadosService {

  egresado_relationships = '_embed=educacion&_embed=contacto&_embed=nacionalidadEgresado&_embed=idiomaEgresado&_embed=experienciaLaboralEgresado&_embed=egresadosHabilidad&_embed=direccionEgresado'
  JSON_SERVER_URL = environment.json_server_url;
  EXPRESS_SERVER_URL = environment.express_server_url;

  private _loggedUserRole: RolUsuario;

  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    private storage: StorageService,
  ) { }

  get loggedUserRole() {
    return this._loggedUserRole;
  }

  set loggedUserRole(rol: RolUsuario) {
    this._loggedUserRole = rol;
  }

   getEgresados(page?: number, q: any = null): Observable<Egresado[]> {
    let url = `${this.JSON_SERVER_URL}/egresado?_page=${page}?${this.egresado_relationships}`;

    if (q) {
      url += `${url}&q=${q}`
    }
  
    return this.http.get<Egresado[]>(url);
  }

  getEgresadoById(id: number): Observable<Egresado> {
    return this.http.get<Egresado>(`${this.JSON_SERVER_URL}/egresado/${id}?${this.egresado_relationships}`)
      .pipe(
        map((egresado) => {
          egresado.experienciaLaboralEgresado = this.helperService
            .sortByDate(egresado.experienciaLaboralEgresado, 'FechaEntr', 'FechaEntr');

          egresado.educacion = this.helperService
            .sortByDate(egresado.educacion, 'FechaSal', 'FechaSal');

          return egresado;
        })
      );
  }

  getEgresadoByName(name: string): Observable<Egresado[]> {
    return this.http.get<Egresado[]>(`${this.EXPRESS_SERVER_URL}/egresados/searchEgresado?name=${name}`);
  }

  updateEgresado({ egresado, selectedProfilePic}: { egresado: Egresado, selectedProfilePic: any}): Observable<Egresado> {
    if (selectedProfilePic) {
      const formData = this.helperService.getProfilePicFormData(selectedProfilePic, egresado.id);
      return this.uploadEgresadoProfilePic(formData)
        .pipe(
          switchMap((imageData) => {
            if (imageData) {
              egresado.profilePicUrl = imageData.url;
            }
            return this.http.patch<Egresado>(`${this.JSON_SERVER_URL}/egresado/${egresado.id}`, egresado);
        }));
    } else {
      return this.http.patch<Egresado>(`${this.JSON_SERVER_URL}/egresado/${egresado.id}`, egresado);
    }
  }

  updateEgresadoStatus(egresadoId: number, status: boolean): Observable<Egresado> {
    return this.http.patch<Egresado>(`${this.JSON_SERVER_URL}/egresado/${egresadoId}`, { Activo: status });
  }

  filterEgresados(egresadosFilters: egresadosFilters, page?: number, q: any = undefined): Observable<Egresado[]> {
    const params = new HttpParams()
    .set('destacados', egresadosFilters.destacados)
    .set('rangoFechaInicio', egresadosFilters.rangoFechaInicio || null)
    .set('rangoFechaFin', egresadosFilters.rangoFechaFin || null)
    .set('habilidades', JSON.stringify(egresadosFilters.habilidades))
    .set('provincias', JSON.stringify(egresadosFilters.provincias))
    .set('tituloTipos', JSON.stringify(egresadosFilters.tituloTipos))
    .set('dateRangeDisabled', egresadosFilters.dateRangeDisabled)
    .set('deshabilitados', egresadosFilters.deshabilitados)
    .set('q', q)
    .set('page', page);

    return this.http.get<Egresado[]>(`${this.EXPRESS_SERVER_URL}/egresados/filter`, { params: params });
  }

  getEgresadosCandidatos(page?: number, q?: string): Observable<Egresado[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('q', q);

    return this.http.get<Egresado[]>(`${this.EXPRESS_SERVER_URL}/egresados/candidatos`, { params });
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

  uploadEgresadoProfilePic(data: any): Observable<any>{
    return this.http.post(environment.cloudinary.upload_url, data);
  }
}
