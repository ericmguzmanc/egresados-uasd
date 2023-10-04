import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestacadosPageRoutingModule } from './destacados-routing.module';

import { DestacadosPage } from './destacados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestacadosPageRoutingModule
  ],
  declarations: [DestacadosPage]
})
export class DestacadosPageModule {}
