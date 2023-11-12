import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RolUsuario, Usuario } from '../interfaces/usuario.interface';
import { StorageService } from './storage.service';
import { CookieService } from 'ngx-cookie-service';
import { EgresadosService } from './egresados.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  EXPRESS_SERVER_URL = environment.express_server_url;
  JSON_SERVER_URL = environment.json_server_url;

  loggedUserRole: Subject<RolUsuario> = new Subject<RolUsuario>();

  constructor(
    private http: HttpClient, 
    private storage: StorageService, 
    private cookieService: CookieService,
    private egresadosService: EgresadosService,
  ) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.EXPRESS_SERVER_URL}/auth/login`, {email: credentials.email, password: credentials.password });
  }

  async logout() {
    this.setLoggedUserRole(null);
    this.egresadosService.loggedUserRole = null;
    this.cookieService.delete('token');
    await this.storage.clear();
  }

  getUsuario(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.JSON_SERVER_URL}/usuario/${userId}?_embed=rolUsuario`);
  }

  setLoggedUserRole(rol: RolUsuario) {
    this.loggedUserRole.next(rol);
  }

  getResetPasswordToken(email: string): Observable<any> {
    return this.http.put(`${this.EXPRESS_SERVER_URL}/auth/update-password`, {email});
  }

  // ...

  setNewPassword(token: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('reset', `${token}`);
    return this.http.put(`${this.EXPRESS_SERVER_URL}/auth/reset-password`, { password }, { headers });
  }
}
