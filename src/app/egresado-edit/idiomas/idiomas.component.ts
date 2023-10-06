import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CheckboxChangeEventDetail, ModalController } from '@ionic/angular';
import { Idioma } from 'src/app/shared/interfaces/egresado.interface';
import { EgresadosService } from 'src/app/shared/services/egresados.service';
import { EntitiesService } from 'src/app/shared/services/entities.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss'],
})
export class IdiomasComponent  implements OnInit {
  @Input() egresadoId: number;
  @Input() idiomasEgresado: Idioma[] | undefined;
  @Output() idiomaSeleccionado = new EventEmitter<Idioma[] | undefined>();
  
  selectedValue: number;
  
  idiomas: Idioma[];
  loading = false;
  
  constructor(
    private entitiesService: EntitiesService, 
    private modalCtrl: ModalController,
    private egresadoService: EgresadosService
  ) { }
    
  ngOnInit() {
    this.loading = true;
    this.entitiesService.getIdiomas()
      .subscribe((idiomas: Idioma[]) => {
        this.idiomas = idiomas.map((i) => {
          const exists = this.idiomasEgresado?.some(ie => ie.idiomaId === i.id);
          return { ...i, checked: !!exists }
        });
        this.loading = false;
      });
  }

  close() {
    return this.modalCtrl.dismiss(this.idiomasEgresado, 'confirm');
  }

  checkboxChanged(event: any, idioma: Idioma) {
    const idiomaChecked = event.detail as CheckboxChangeEventDetail;

    if (idiomaChecked.checked) {
      this.addEgresadoIdioma(idioma);
    } else {
      this.removeEgresadoIdioma(idioma.id);
    }
  }

  addEgresadoIdioma(idioma: Idioma) {
    const newIdioma = {
      idioma: idioma.idioma,
      idiomaId: idioma.id,
      egresadoId: this.egresadoId
    }

    this.egresadoService.addIdiomaEgresado(newIdioma)
      .subscribe((idioma) => {
        this.idiomasEgresado.push({
          ...idioma,
          egresadoId: this.egresadoId,
        });
      });
  }

  removeEgresadoIdioma(idiomaId: number) {
    const idiomaToRemove = this.idiomasEgresado.find((idiomaEgresado) => idiomaEgresado.idiomaId === idiomaId);
    
    if (idiomaToRemove) {
      this.egresadoService.removeIdiomaEgresado(idiomaToRemove.id)
      .subscribe((_) => {
        this.idiomasEgresado = this.idiomasEgresado.filter((idiomaEgresado) => idiomaToRemove.id != idiomaEgresado.id)
      });
    }
  }

}
