import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Usuario } from '../shared/interfaces/usuario.interface';
import { ROLES } from '../shared/constants';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { EgresadosService } from '../shared/services/egresados.service';
import { Egresado } from '../shared/interfaces/egresado.interface';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {
  loggedInRol: ROLES;
  loggedUserId: number;
  usuario: Usuario;
  egresado: Egresado;
  userId: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageService,
    private egresadosService: EgresadosService
  ) {}

  async ionViewWillEnter() {
    const loggedInUser = await this.storage.get('loggedInUserId');

    this.loggedUserId = loggedInUser;
    if (loggedInUser) {
      this.authService
        .getUsuario(loggedInUser)
        .subscribe((usuario: Usuario) => {
          this.usuario = usuario;
          this.userId = usuario.egresadoId;
          this.authService.setLoggedUserRole(usuario.rolUsuario[0]);
          this.storage.set('loggedUserRole', usuario.rolUsuario[0]);
          this.egresadosService
            .getEgresadoById(this.userId)
            .subscribe((egresado: Egresado) => {
              this.egresado = egresado;
            });
        });
    } else {
      this.router.navigate(['/tabs/login']);
    }
  }

  goToEgresadoEdit() {
    this.router.navigate(['/egresado-edit', this.loggedUserId]);
  }

  getRole() {
    return this.usuario.rolUsuario[0].rol;
  }

  isAdminUser() {
    return this.usuario
      ? this.usuario.rolUsuario[0].rol === ROLES.ADMINISTRADOR
      : null;
  }

  async logout() {
    this.authService.logout();
    this.router.navigate(['/tabs/egresados']);
  }
}
