import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EgresadosService } from './services/egresados.service';
import { EgresadosListComponentModule } from './components/egresados-list/egresados-list.module';
import { HelperService } from './services/helper.service';
import { EntitiesService } from './services/entities.service';
import { LoaderComponentModule } from './components/loader/loader.module';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { PhoneMaskDirective } from './phone-mask.directive';

@NgModule({
  declarations: [
    PhoneMaskDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    EgresadosListComponentModule,
    LoaderComponentModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  exports: [
    EgresadosListComponentModule,
    LoaderComponentModule,
    NgxMaskPipe,
    NgxMaskDirective,
    PhoneMaskDirective
  ],
  providers: [
    EgresadosService,
    HelperService,
    EntitiesService,
    provideNgxMask()
  ]
})
export class SharedModule {}