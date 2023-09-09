import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisAplicacionesPageRoutingModule } from './mis-aplicaciones-routing.module';

import { MisAplicacionesPage } from './mis-aplicaciones.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    MisAplicacionesPageRoutingModule
  ],
  declarations: [MisAplicacionesPage]
})
export class MisAplicacionesPageModule {}
