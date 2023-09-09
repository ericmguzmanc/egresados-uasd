import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisAplicacionesPage } from './mis-aplicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: MisAplicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisAplicacionesPageRoutingModule {}
