import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EgresadosService } from './services/egresados.service';
import { EgresadosListComponentModule } from './components/egresados-list/egresados-list.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    EgresadosListComponentModule,
  ],
  exports: [
    EgresadosListComponentModule
  ],
  providers: [
    EgresadosService
  ]
})
export class SharedModule {}