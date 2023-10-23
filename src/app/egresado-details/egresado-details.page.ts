import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Egresado } from '../shared/interfaces/egresado.interface';
import { EgresadosService } from '../shared/services/egresados.service';
import { LOADING_TIMEOUT } from '../shared/constants';
import { ModalController } from '@ionic/angular';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-egresado-details',
  templateUrl: './egresado-details.page.html',
  styleUrls: ['./egresado-details.page.scss'],
})
export class EgresadoDetailsPage implements OnInit {
  @Input() egresadoId: number;

  egresado: Egresado = {};
  loading: boolean = true;

  constructor(
    private location: Location,
    private egresadoService: EgresadosService,
    public helperService: HelperService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if (this.egresadoId) {
      this.egresadoService.getEgresadoById(this.egresadoId)
        .subscribe((egresado: Egresado) => {
          this.egresado = egresado;
          console.log('egresado-details: Egresado Cargado -> ', this.egresado);

          setTimeout(() => {
            this.loading = false;
          },LOADING_TIMEOUT)
      });
    }
  }

  onBackButtonClick(): void {
    this.location.back();
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(null, 'confirm');
  }

}
