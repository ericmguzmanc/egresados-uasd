import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Egresado } from '../shared/interfaces/egresado.interface';
import { EgresadosService } from '../shared/services/egresados.service';
import { ABOUT_TEXTAREA_LENGTH, LOADING_TIMEOUT } from '../shared/constants';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { HelperService } from '../shared/services/helper.service';
import { StorageService } from '../shared/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-egresado-details',
  templateUrl: './egresado-details.page.html',
  styleUrls: ['./egresado-details.page.scss'],
})
export class EgresadoDetailsPage implements OnInit {
  @Input() egresadoId: number;
  @Input() candidatosMode: boolean;

  contador: number = 0;
  descripcionDestacadoLength = ABOUT_TEXTAREA_LENGTH;
  egresado: Egresado = {};
  loading: boolean = true;
  userIsAdmin: boolean = false;
  egresadoChanged: boolean = false;
  marcarDestacadoMode: boolean = false;
  marcarDestacadoModeFromBtn: boolean = false;

  marcarDestacadoForm: FormGroup = this.fb.group({
    descripcionDestacado: ['', [Validators.maxLength(ABOUT_TEXTAREA_LENGTH)]]
  });

  constructor(
    private location: Location,
    private egresadoService: EgresadosService,
    public helperService: HelperService,
    private modalCtrl: ModalController,
    private storage: StorageService,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private alertController: AlertController
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

          this.loadMarcarDestacadoForm();
          console.log('egresado-details: Egresado Cargado -> ', this.egresado);

          setTimeout(() => {
            this.loading = false;
          }, LOADING_TIMEOUT)
      });
    }
  }

  loadMarcarDestacadoForm() {
    this.marcarDestacadoForm.patchValue({ descripcionDestacado: this.egresado.descripcionDestacado });
  }

  onBackButtonClick(): void {
    this.location.back();
  }

  toggleEgresadoActiveStatus(status: boolean) {
    this.egresadoService.updateEgresadoStatus(this.egresadoId, { Activo: status })
      .subscribe(async (egresado) => {
        this.egresado.Activo = egresado.Activo;
        const toastMsg = `El Perfil de este Egresado fue` + (status ? ` Activado.` : ` Desactivado.`);
        this.statusChangedToast(toastMsg);
        this.egresadoChanged = true;
      });
  }

  toggleEgresadoDestacado(status: boolean) {
    const egresadoUpdate = {
      destacado: status,
      fueDestacado: true,
      descripcionDestacado: status ? this.marcarDestacadoForm.get('descripcionDestacado').value : ""
    }

    this.egresadoService.updateEgresadoStatus(this.egresadoId, egresadoUpdate)
      .subscribe(async (egresado) => {
        this.egresado.destacado = egresado.destacado;
        this.egresado.descripcionDestacado = egresado.descripcionDestacado;
        this.egresado.fueDestacado = egresado.fueDestacado;

        this.marcarDestacadoMode = false;
        this.marcarDestacadoModeFromBtn = false;
        const toastMsg = `El Perfil de este Egresado fue ` + (status ? ` marcado como Destacado.` : ` removido de Destacados.`);
        this.statusChangedToast(toastMsg);
        this.egresadoChanged = true;
      });
  }

  toggleMarcarDestacadoMode(fromDedicatedButton: boolean = false) {
    if (fromDedicatedButton) {
      this.marcarDestacadoModeFromBtn = !this.marcarDestacadoModeFromBtn
    }

    this.marcarDestacadoMode = !this.marcarDestacadoMode;
  }

  async marcarComoDestacado(showConfirmation: boolean = false) {
    if (this.marcarDestacadoModeFromBtn) {
      const alert = await this.alertController.create({
        header: '¿Estás seguro de marcar este egresado como Destacado?',
        subHeader: 'Solo podrás marcar un egresado una vez, un egresado no podrá ser Destacado dos veces.',
        message: '',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('✨ Alerta Cancelada')
            },
          },
          {
            text: 'OK',
            role: 'Confirmar',
            handler: () => {
              console.log('✨ Alerta Aceptada')
              this.toggleEgresadoDestacado(true);
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.egresadoService.updateEgresadoStatus(this.egresadoId, { descripcionDestacado: this.marcarDestacadoForm.get('descripcionDestacado').value})
        .subscribe(async (egresado) => {
          this.egresado.descripcionDestacado = egresado.descripcionDestacado;
          this.marcarDestacadoMode = false;
          this.egresadoChanged = true;
        });
    }

  }

  async desmarcarDestacadoConfirmation() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de remover el estado de Destacado de este egresado?',
      subHeader: 'Una vez remuevas el status de Destacado, este egresado no podrá ser Destacado de nuevo.',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('✨ Alerta Cancelada')
          },
        },
        {
          text: 'OK',
          role: 'Confirmar',
          handler: () => {
            console.log('✨ Alerta Aceptada')
            this.toggleEgresadoDestacado(false);
          },
        },
      ],
    });

    await alert.present();
  }

  async statusChangedToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

  confirm() {
    let data = null;
    if (this.egresadoChanged) {
      data = this.egresado;
    }
    
    this.modalCtrl.dismiss(data, 'confirm');
  }

  onDescripcionDestacadoKeyUp(event?: any) {
    this.contador = event.target.value.length;
  }

}
