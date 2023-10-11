import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresadosListComponent } from './egresados-list.component';
import { EgresadosService } from '../../services/egresados.service';
import { HelperService } from '../../services/helper.service';
import { LoaderComponentModule } from '../loader/loader.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { spinnerInterceptor } from '../../interceptor/spinner.interceptor';

@NgModule({
  declarations: [EgresadosListComponent],
  exports: [EgresadosListComponent],
  providers: [
    EgresadosService,
    HelperService,
    {provide: HTTP_INTERCEPTORS, useClass: spinnerInterceptor, multi: true}
  ],
  imports: [CommonModule, FormsModule, IonicModule, LoaderComponentModule],
})
export class EgresadosListComponentModule {}
