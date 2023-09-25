import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresadosPageRoutingModule } from './egresados-routing.module';

import { EgresadosPage } from './egresados.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { EgresadosListComponentModule } from '../egresados-list/egresados-list.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    EgresadosPageRoutingModule,
    EgresadosListComponentModule
  ],
  declarations: [EgresadosPage]
})
export class EgresadosPageModule {}
