import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNgxMask } from 'ngx-mask';
import { IonicModule } from '@ionic/angular';

import { EgresadoEditPageRoutingModule } from './egresado-edit-routing.module';

import { IdiomasComponent } from './idiomas/idiomas.component';
import { SharedModule } from '../shared/shared.module';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { ContactosComponent } from './contactos/contactos.component';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EgresadoEditPageRoutingModule,
    SharedModule, 
  ],
  declarations: [
    IdiomasComponent, 
    HabilidadesComponent,
    ContactosComponent,
    ExperienciaLaboralComponent,
  ],
  
  providers: [provideNgxMask()]
})
export class EgresadoEditPageModule {}
