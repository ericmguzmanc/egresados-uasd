import { Component, Input, OnInit } from '@angular/core';
import { CheckboxChangeEventDetail, ModalController } from '@ionic/angular';
import { EgresadosHabilidad } from 'src/app/shared/interfaces/egresado.interface';
import { EgresadosService } from 'src/app/shared/services/egresados.service';
import { EntitiesService } from 'src/app/shared/services/entities.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss'],
})
export class HabilidadesComponent  implements OnInit {
  @Input() egresadoId: number;
  @Input() egresadosHabilidad: EgresadosHabilidad[];

  loading = false;
  habilidades: EgresadosHabilidad[] = [];

  constructor(
    private modalCtrl: ModalController,
    private entitiesService: EntitiesService,
    private egresadoService: EgresadosService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.entitiesService.getHabilidades()
    .subscribe((habilidades: EgresadosHabilidad[]) => {
      this.habilidades = habilidades.map((habilidad) => {
        const exists = this.egresadosHabilidad?.some(egresadoHabilidad => egresadoHabilidad.habilidadId === habilidad.id);
        console.log('🚀 ~ file: habilidades.component.ts:28 ~ HabilidadesComponent ~ this.habilidades=habilidades.map ~ exists:', exists)
        return { ...habilidad, checked: !!exists }
      });
      this.loading = false;
    });
  }

  checkboxChanged(event: any, habilidad: EgresadosHabilidad) {
    const idiomaChecked = event.detail as CheckboxChangeEventDetail;

    if (idiomaChecked.checked) {
      this.addEgresadoHabilidad(habilidad);
    } else {
      this.removeEgresadoHabilidad(habilidad.id);
    }
  }

  addEgresadoHabilidad(habilidad: EgresadosHabilidad) {
    const newHabilidad = {
      habilidad: habilidad.habilidad,
      habilidadId: habilidad.id,
      egresadoId: this.egresadoId
    }

    this.egresadoService.addHabilidadEgresado(newHabilidad)
      .subscribe((habilidad) => {
        this.egresadosHabilidad.push({
          ...habilidad,
          egresadoId: this.egresadoId,
        });
      });
  }

  removeEgresadoHabilidad(habilidadId: number) {
    const habilidadToRemove = this.egresadosHabilidad.find((habilidad) => habilidad.habilidadId === habilidadId);
    
    if (habilidadToRemove) {
      this.egresadoService.removeHabilidadEgresado(habilidadToRemove.id)
        .subscribe((_) => {
          this.egresadosHabilidad = this.egresadosHabilidad.filter((habilidad) => habilidadToRemove.id != habilidad.id)
        });
    }
  }

  close() {
    return this.modalCtrl.dismiss(this.egresadosHabilidad, 'confirm');
  }
}
