import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Idioma } from 'src/app/shared/interfaces/egresado.interface';
import { EntitiesService } from 'src/app/shared/services/entities.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss'],
})
export class IdiomasComponent  implements OnInit {
  @Input() idiomasEgresado: Idioma[] | undefined;
  @Output() idiomaSeleccionado = new EventEmitter<Idioma[] | undefined>();
  
  selectedValue: number;
  
  idiomas: Idioma[];
  loading = false;
  
  constructor(private entitiesService: EntitiesService, private modalCtrl: ModalController) { }
  
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

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const checkedIdiomas = this.idiomas.filter((idioma) => idioma.checked);
    return this.modalCtrl.dismiss(checkedIdiomas, 'confirm');
  }

}
