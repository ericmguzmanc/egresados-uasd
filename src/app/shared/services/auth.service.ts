import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  EXPRESS_SERVER_URL = environment.express_server_url;
  JSON_SERVER_URL = environment.json_server_url;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.EXPRESS_SERVER_URL}/auth/login`, {email: credentials.email, password: credentials.password });
  }

  getUsuario(userId: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.JSON_SERVER_URL}/usuario/${userId}?_embed=rolUsuario`);
  }
}
