import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresadosPageRoutingModule } from './egresados-routing.module';

import { EgresadosPage } from './egresados.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { spinnerInterceptor } from '../shared/interceptor/spinner.interceptor';
import { LoaderComponentModule } from '../shared/components/loader/loader.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    EgresadosPageRoutingModule,
    SharedModule,
    LoaderComponentModule,
    
  ],
  declarations: [EgresadosPage],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: spinnerInterceptor, multi: true}],
})
export class EgresadosPageModule {}
