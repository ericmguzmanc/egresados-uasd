import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresadosListComponent } from './egresados-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EgresadosListComponent],
  exports: [EgresadosListComponent],
  providers: [],
  imports: [CommonModule, FormsModule, IonicModule, SharedModule],
})
export class EgresadosListComponentModule {}
