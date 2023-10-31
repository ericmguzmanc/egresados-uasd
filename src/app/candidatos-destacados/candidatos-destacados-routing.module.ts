import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidatosDestacadosPage } from './candidatos-destacados.page';

const routes: Routes = [
  {
    path: '',
    component: CandidatosDestacadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EgresadosPageRoutingModule {}
