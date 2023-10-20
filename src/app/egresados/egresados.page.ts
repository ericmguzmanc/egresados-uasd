import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { EgresadosService } from '../shared/services/egresados.service';
import { Egresado } from '../shared/interfaces/egresado.interface';
import  { LOADING_TIMEOUT } from 'src/app/shared/constants';
import { EgresadoDetailsPage } from '../egresado-details/egresado-details.page';

@Component({
  selector: 'app-egresados',
  templateUrl: './egresados.page.html',
  styleUrls: ['./egresados.page.scss'],
})
export class EgresadosPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  egresados: Egresado[] = [];
  loading: boolean = true;
  pageNumber: number = 1;
  constructor(
    private egresadosService: EgresadosService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.loadEgresados();
  }

  loadEgresados() {
    this.egresadosService.getEgresados(this.pageNumber)
      .subscribe((egresados: Egresado[]) => {
        this.egresados = [...this.egresados, ...egresados];
        setTimeout(() => {
          this.loading = false;
        }, LOADING_TIMEOUT );
      });
  }

  setPageNumber(page: number) {
    this.pageNumber = page;
    this.loadEgresados();
  }

  async openEgresadoDetailsModal(egresadoId: number) {
    if (!egresadoId) {
      return;
    }

    const egresadoDetailModal = await this.modalCtrl.create({
      component: EgresadoDetailsPage,
      componentProps: {
        egresadoId: egresadoId,
      }
    });

    egresadoDetailModal.present();

    const { data, role } = await egresadoDetailModal.onWillDismiss();
    
    if (role === 'confirm') {
      console.log('✨ Modal egresadoDetail closed. ->', data);
    } 
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
