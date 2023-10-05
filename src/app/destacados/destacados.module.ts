import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestacadosPageRoutingModule } from './destacados-routing.module';

import { DestacadosPage } from './destacados.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestacadosPageRoutingModule,
    SharedModule
  ],
  declarations: [DestacadosPage]
})
export class DestacadosPageModule {}
