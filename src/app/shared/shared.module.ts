import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EgresadosService } from './services/egresados.service';
import { EgresadosListComponentModule } from './components/egresados-list/egresados-list.module';
import { HelperService } from './services/helper.service';

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
    EgresadosService,
    HelperService
  ]
})
export class SharedModule {}