import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EgresadoEditPage } from './egresado-edit.page';
import { loginGuard } from '../shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: EgresadoEditPage,
    canActivate: [loginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EgresadoEditPageRoutingModule {}
