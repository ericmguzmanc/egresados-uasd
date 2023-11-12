import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'egresado-details/:id',
    loadChildren: () => import('./egresado-details/egresado-details.module').then( m => m.EgresadoDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'egresado-edit/:id',
    loadChildren: () => import('./egresado-edit/egresado-edit.module').then( m => m.EgresadoEditPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./auth/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'reset/:token',
    loadChildren: () => import('./auth/reset/reset.module').then( m => m.ResetPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
