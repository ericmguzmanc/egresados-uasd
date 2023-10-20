import { Component, OnInit } from '@angular/core';
import { EgresadosService } from '../shared/services/egresados.service';
import { Egresado } from '../shared/interfaces/egresado.interface';
import { HelperService } from '../shared/services/helper.service';
import { LOADING_TIMEOUT } from '../shared/constants';
import { ModalController } from '@ionic/angular';
import { EgresadoDetailsPage } from '../egresado-details/egresado-details.page';
@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.page.html',
  styleUrls: ['./destacados.page.scss'],
})
export class DestacadosPage implements OnInit {
  egresados: Egresado[] = [];
  loading: boolean = true;
  
  constructor(
    private egresadosService: EgresadosService,
    public helperService: HelperService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.loadEgresados();
  }
  
  /** 
  * Esta funcion se encarga de filtrar los egresados para mostrarlos solo los destacados.
  * @summary funcion que filtra el array de egresados para mostrarlos solo los destacados  .
  * @param {Array} egresados - Egresados es un array de objetos de tipo Egresado el cual trae de la Api todos los egresados para filtarlos y solo optener los destacados.
  * @param {Array} - Esta obtine una array de objetos de tipo Egresado y filtra los destacados que reasigna a la variable objeto otra vez.
  * @return {Array} debuelve un array de objetos de tipo Egresado y reasigna estos valores a egresados y los muetra al front solo los que cumpolen esta condición 
  * @example
  *   const egresados = [
  {
    id: 1,
    nombre: 'John Doe',
    apellido: 'Doe',
    destacado: true
  }.
  */
  loadEgresados() {
    this.egresadosService.getEgresados()
      .subscribe((egresados: Egresado[]) => {
        const destacados = egresados.filter((ex) => ex.destacado);
        this.egresados = destacados;
        
        setTimeout(() => {
          this.loading = false;
        }, LOADING_TIMEOUT)
    });
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
}