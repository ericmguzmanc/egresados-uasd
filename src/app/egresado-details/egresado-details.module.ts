import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresadoDetailsPageRoutingModule } from './egresado-details-routing.module';

import { EgresadoDetailsPage } from './egresado-details.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EgresadoDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [EgresadoDetailsPage]
})
export class EgresadoDetailsPageModule {}
