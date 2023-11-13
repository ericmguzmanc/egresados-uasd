import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresadoDetailsPageRoutingModule } from './egresado-details-routing.module';

import { EgresadoDetailsPage } from './egresado-details.page';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { spinnerInterceptor } from '../shared/interceptor/spinner.interceptor';
import { LoaderComponentModule } from '../shared/components/loader/loader.module';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EgresadoDetailsPageRoutingModule,
    SharedModule,
    LoaderComponentModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  declarations: [EgresadoDetailsPage],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: spinnerInterceptor, multi: true}, provideNgxMask()]
})
export class EgresadoDetailsPageModule {}
