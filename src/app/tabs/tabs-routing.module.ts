import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: "vacantes",
        loadChildren: () => import('../vacantes/vacantes.module').then(m => m.VacantesPageModule)
      },
      {
        path: "mis-aplicaciones",
        loadChildren: () => import('../mis-aplicaciones/mis-aplicaciones.module').then(m => m.MisAplicacionesPageModule)
      },
      {
        path: "configuracion",
        loadChildren: () => import('../configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/vacantes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/vacantes',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
