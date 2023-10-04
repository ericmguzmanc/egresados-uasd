import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'egresados',
        loadChildren: () =>
          import('../egresados/egresados.module').then(
            (m) => m.EgresadosPageModule
          ),
      },
      {
        path: 'destacados',
        loadChildren: () => import('../destacados/destacados.module').then( m => m.DestacadosPageModule)
      },
      {
        path: 'configuracion',
        loadChildren: () =>
          import('../configuracion/configuracion.module').then(
            (m) => m.ConfiguracionPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/egresados',
        pathMatch: 'full',
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/egresados',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
