import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionPage } from './configuracion.page';
import { loginGuard } from '../shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionPage,
    canActivate: [loginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionPageRoutingModule {}
