import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { StorageService } from '../shared/services/storage.service';
import { HelperService } from '../shared/services/helper.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  userIsAdmin: boolean = false;

  constructor(
    private storage: StorageService, 
    private authService: AuthService,
    private helperService: HelperService,
    private cookieService: CookieService,
  ) {}

  async ngOnInit() {
    console.log('in tabs')

    if (this.cookieService.get('token')) {
      const loggedUserRole = await this.storage.get('loggedUserRole'); 
      if (loggedUserRole) {
        this.authService.setLoggedUserRole(loggedUserRole);
        this.userIsAdmin = this.helperService.isUserAdmin(loggedUserRole);
      }
    } else {
     this.storage.clear();
    }

    // Se dispara cada vez que el subject cambie su valor.
    this.authService.loggedUserRole
      .subscribe((rolUsuario) => {
        this.userIsAdmin = this.helperService.isUserAdmin(rolUsuario);
      });
  }

}
