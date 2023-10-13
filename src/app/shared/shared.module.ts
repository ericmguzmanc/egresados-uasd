import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EgresadosService } from './services/egresados.service';
import { EgresadosListComponentModule } from './components/egresados-list/egresados-list.module';
import { HelperService } from './services/helper.service';
import { EntitiesService } from './services/entities.service';
import { LoaderComponentModule } from './components/loader/loader.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    EgresadosListComponentModule,
    LoaderComponentModule,
  ],
  exports: [
    EgresadosListComponentModule,
    LoaderComponentModule,
  ],
  providers: [
    EgresadosService,
    HelperService,
    EntitiesService
  ]
})
export class SharedModule {}