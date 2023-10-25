import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TexareaComponent } from './texarea.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TexareaComponent],
  exports: [TexareaComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class TextareaModule { }
