import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacantesPageRoutingModule } from './vacantes-routing.module';

import { VacantesPage } from './vacantes.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    VacantesPageRoutingModule
  ],
  declarations: [VacantesPage]
})
export class VacantesPageModule {}
