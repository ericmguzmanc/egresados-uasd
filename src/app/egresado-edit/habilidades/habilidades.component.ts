import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EgresadosHabilidad } from 'src/app/shared/interfaces/egresado.interface';
import { EntitiesService } from 'src/app/shared/services/entities.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss'],
})
export class HabilidadesComponent  implements OnInit {
  @Input() egresadosHabilidad: EgresadosHabilidad[];

  loading = false;
  habilidades: EgresadosHabilidad[] = [];

  constructor(
    private modalCtrl: ModalController,
    private entitiesService: EntitiesService
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

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const checkedHabilidades = this.habilidades.filter((habilidad) => habilidad.checked);
    return this.modalCtrl.dismiss(checkedHabilidades, 'confirm');
  }
}
