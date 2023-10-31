import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { LoadingController } from '@ionic/angular';
import { RolUsuario, Usuario } from '../shared/interfaces/usuario.interface';
import { ROLES } from '../shared/constants';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage {

  loggedInRol: ROLES;
  loggedUserId: number;
  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private storage: StorageService
  ) { }

  async ionViewWillEnter() {
    const loggedInUser = await this.storage.get('loggedInUserId')
    console.log('from storage ', loggedInUser );

    this.loggedUserId = loggedInUser;
    if (loggedInUser) {
      this.authService.getUsuario(loggedInUser)
        .subscribe((usuario: Usuario) => {
          this.usuario = usuario;
          console.log('🚀 ~ file: configuracion.page.ts:25 ~ ConfiguracionPage ~ .subscribe ~ usuario:', usuario);
        }); 
    } else {
      this.router.navigate(['/tabs/login']);
    }
  };

  goToEgresadoEdit() {
    this.router.navigate(['/egresado-edit', this.loggedUserId]);
  }

  getRole() {
    return this.usuario.rolUsuario[0].rol;
  }

  isAdminUser() {
    return this.usuario ? this.usuario.rolUsuario[0].rol === ROLES.ADMINISTRADOR : null
  }

  async logout() {
    await this.storage.remove('loggedInUserId');
    this.router.navigate(['/tabs/egresados']);
  }
}
