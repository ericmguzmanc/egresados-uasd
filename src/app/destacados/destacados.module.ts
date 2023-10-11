import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestacadosPageRoutingModule } from './destacados-routing.module';

import { DestacadosPage } from './destacados.page';
import { SharedModule } from '../shared/shared.module';
import { LoaderComponentModule } from '../shared/components/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestacadosPageRoutingModule,
    SharedModule,
    LoaderComponentModule
  ],
  declarations: [DestacadosPage]
})
export class DestacadosPageModule {}
