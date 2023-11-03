import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Egresado } from '../shared/interfaces/egresado.interface';
import { EgresadosService } from '../shared/services/egresados.service';
import { LOADING_TIMEOUT } from '../shared/constants';
import { ModalController, ToastController } from '@ionic/angular';
import { HelperService } from '../shared/services/helper.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-egresado-details',
  templateUrl: './egresado-details.page.html',
  styleUrls: ['./egresado-details.page.scss'],
})
export class EgresadoDetailsPage implements OnInit {
  @Input() egresadoId: number;

  egresado: Egresado = {};
  loading: boolean = true;
  userIsAdmin: boolean = false;
  egresadoChanged: boolean = false;

  constructor(
    private location: Location,
    private egresadoService: EgresadosService,
    public helperService: HelperService,
    private modalCtrl: ModalController,
    private storage: StorageService,
    private toastCtrl: ToastController,
  ) { }

  async ngOnInit() {
    if (this.egresadoId) {

      const loggedUserRole = await this.storage.get('loggedUserRole'); 
      if (loggedUserRole) {
        this.userIsAdmin = this.helperService.isUserAdmin(loggedUserRole);
      }

      this.egresadoService.getEgresadoById(this.egresadoId)
        .subscribe((egresado: Egresado) => {
          this.egresado = egresado;
          console.log('egresado-details: Egresado Cargado -> ', this.egresado);

          setTimeout(() => {
            this.loading = false;
          }, LOADING_TIMEOUT)
      });
    }
  }

  onBackButtonClick(): void {
    this.location.back();
  }

  setEgresadoStatus(status: boolean) {
    this.egresadoService.updateEgresadoStatus(this.egresadoId, status)
      .subscribe(async (egresado) => {
        console.log('🚀 ~ file: egresado-details.page.ts:66 ~ EgresadoDetailsPage ~ .subscribe ~ egresado:', egresado);
        this.egresado.Activo = egresado.Activo;
        
        const toastMsg = 'El Perfil de este Egresado fue';
        const toast = await this.toastCtrl.create({
          message: status ? `${toastMsg} Activado.` : `${toastMsg} Desactivado.`,
          duration: 1500,
          position: 'bottom',
        });
    
        await toast.present();

        this.egresadoChanged = true;
      });
  }

  confirm() {
    let data = null;
    if (this.egresadoChanged) {
      data = this.egresado;
    }
    
    this.modalCtrl.dismiss(data, 'confirm');
  }

}
