import { Component, Input, OnInit } from '@angular/core';
import { Idioma } from 'src/app/shared/interfaces/egresado.interface';
import { EntitiesService } from 'src/app/shared/services/entities.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss'],
})
export class IdiomasComponent  implements OnInit {
  @Input() idiomasEgresado: Idioma[] | undefined;

  idiomas: Idioma[];
  loading = false;
  
  constructor(private entitiesService: EntitiesService) { }
  
  ngOnInit() {
    this.loading = true;
    this.entitiesService.getIdiomas()
    .subscribe((idiomas: Idioma[]) => {
      this.idiomas = idiomas.map((i) => {
        const exists = this.idiomasEgresado?.some(ie => ie.id === i.id);
        return { ...i, disabled: !!exists }
      });
      this.loading = false;
    });
  }

}
