import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EgresadoEditPage } from './egresado-edit.page';

const routes: Routes = [
  {
    path: '',
    component: EgresadoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EgresadoEditPageRoutingModule {}
