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
  loggedEgresadoId: number;
  usuario: Usuario;
  egresado: Egresado;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageService,
    private egresadosService: EgresadosService
  ) {}

  async ionViewWillEnter() {
    const loggedInUser = await this.storage.get('loggedInUserId');

    if (loggedInUser) {
      this.authService
        .getUsuario(loggedInUser)
        .subscribe((usuario: Usuario) => {
          this.usuario = usuario;
          this.loggedEgresadoId = usuario.egresadoId;

          this.authService.setLoggedUserRole(usuario.rolUsuario[0]);
          this.storage.set('loggedUserRole', usuario.rolUsuario[0]);

          if (this.loggedEgresadoId) {
            this.egresadosService
              .getEgresadoById(this.loggedEgresadoId)
              .subscribe((egresado: Egresado) => {
                this.egresado = egresado;
              });
          }
        });
    } else {
      this.router.navigate(['/tabs/login']);
    }
  }

  goToEgresadoEdit() {
    this.router.navigate(['/egresado-edit', this.loggedEgresadoId]);
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
    this.egresado = null;
    this.authService.logout();
    this.router.navigate(['/tabs/egresados']);
  }
}
