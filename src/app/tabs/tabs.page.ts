import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ROLES } from '../shared/constants';
import { StorageService } from '../shared/services/storage.service';
import { RolUsuario } from '../shared/interfaces/usuario.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  userIsAdmin: boolean = false;

  constructor(private storage: StorageService, private authService: AuthService) {}

  async ngOnInit() {
    console.log('in tabs')

    const loggedUserRole = await this.storage.get('loggedUserRole'); 
    if (loggedUserRole) {
      this.setUserIsAdmin(loggedUserRole);
    }
    // Se dispara cada vez que el subject cambie su valor.
    this.authService.loggedUserRole
      .subscribe((rolUsuario) => {
        this.setUserIsAdmin(rolUsuario);
      });
  }

  setUserIsAdmin(rolUsuario: RolUsuario) {
    if (rolUsuario) {
      console.log('🚀 ~ SUBJECT -> TabsPage ~ .subscribe ~ rol:', rolUsuario.rol);
      this.userIsAdmin = rolUsuario.rol === ROLES.ADMINISTRADOR;
    } else {
      this.userIsAdmin = false;
    }
  }

}
