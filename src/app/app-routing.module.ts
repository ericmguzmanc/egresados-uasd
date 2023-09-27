import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'egresado-details',
    loadChildren: () => import('./egresado-details/egresado-details.module').then( m => m.EgresadoDetailsPageModule)
  },  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },

  // {
  //   path: 'vacantes',
  //   loadChildren: () => import('./vacantes/vacantes.module').then( m => m.VacantesPageModule)
  // },
  // {
  //   path: 'mis-aplicaciones',
  //   loadChildren: () => import('./mis-aplicaciones/mis-aplicaciones.module').then( m => m.MisAplicacionesPageModule)
  // },
  // {
  //   path: 'configuracion',
  //   loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
