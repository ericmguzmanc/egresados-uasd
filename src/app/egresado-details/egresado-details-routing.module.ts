import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EgresadoDetailsPage } from './egresado-details.page';

const routes: Routes = [
  {
    path: '',
    component: EgresadoDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EgresadoDetailsPageRoutingModule {}
