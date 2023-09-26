import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EgresadosListComponent } from './egresados-list.component';
import { EgresadosService } from '../../services/egresados.service';

@NgModule({
  declarations: [EgresadosListComponent],
  exports: [EgresadosListComponent],
  providers: [
    EgresadosService
  ],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class EgresadosListComponentModule {}
