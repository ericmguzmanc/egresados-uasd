import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresadoEditPageRoutingModule } from './egresado-edit-routing.module';

import { EgresadoEditPage } from './egresado-edit.page';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EgresadoEditPageRoutingModule,
    SharedModule
  ],
  declarations: [EgresadoEditPage, IdiomasComponent]
})
export class EgresadoEditPageModule {}