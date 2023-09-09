import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacantesPage } from './vacantes.page';

const routes: Routes = [
  {
    path: '',
    component: VacantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacantesPageRoutingModule {}
