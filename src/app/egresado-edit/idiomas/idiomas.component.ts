import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Idioma } from 'src/app/shared/interfaces/egresado.interface';
import { EntitiesService } from 'src/app/shared/services/entities.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss'],
})
export class IdiomasComponent  implements OnInit, OnDestroy {
  @Input() idiomasEgresado: Idioma[] | undefined;
  @Output() idiomaSeleccionado = new EventEmitter<Idioma[] | undefined>();

  selectedValue: number;

  idiomas: Idioma[];
  loading = false;
  
  constructor(private entitiesService: EntitiesService) { }
  
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

  ngOnDestroy(): void {
    const checkedIdiomas = this.idiomas.filter((idioma) => idioma.checked);
    this.idiomaSeleccionado.emit(checkedIdiomas);
  }

}
