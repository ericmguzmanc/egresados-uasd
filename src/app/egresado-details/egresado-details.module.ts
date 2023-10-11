import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresadoDetailsPageRoutingModule } from './egresado-details-routing.module';

import { EgresadoDetailsPage } from './egresado-details.page';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { spinnerInterceptor } from '../shared/interceptor/spinner.interceptor';
import { LoaderComponentModule } from '../shared/components/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EgresadoDetailsPageRoutingModule,
    SharedModule,
    LoaderComponentModule
  ],
  declarations: [EgresadoDetailsPage],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: spinnerInterceptor, multi: true},]
})
export class EgresadoDetailsPageModule {}
