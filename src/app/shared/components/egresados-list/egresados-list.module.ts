import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresadosListComponent } from './egresados-list.component';
import { EgresadosService } from '../../services/egresados.service';
import { HelperService } from '../../services/helper.service';

@NgModule({
  declarations: [EgresadosListComponent],
  exports: [EgresadosListComponent],
  providers: [
    EgresadosService,
    HelperService
  ],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class EgresadosListComponentModule {}
