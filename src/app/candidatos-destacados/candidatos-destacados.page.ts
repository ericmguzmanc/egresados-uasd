import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EgresadosService } from '../shared/services/egresados.service';
import { Egresado } from '../shared/interfaces/egresado.interface';
import { EgresadoDetailsPage } from '../egresado-details/egresado-details.page';
import { egresadosFilters } from '../shared/interfaces/egresadosFilters.interface';
import { RouterExtService } from '../shared/services/RouterExt.service';
import { APP_ROUTES } from '../shared/constants';

@Component({
  selector: 'app-egresados',
  templateUrl: './candidatos-destacados.page.html',
  styleUrls: ['./candidatos-destacados.page.scss'],
})
export class CandidatosDestacadosPage implements OnInit {
  name: string = '';
  egresados: Egresado[] = [];
  lastEgresadosResponse: Egresado[] = [];
  pageNumber: number = 1;
  results: Egresado[];
  loading: boolean = false;
  searchQuery: string;
  egresadosFilters: egresadosFilters;

  constructor(
    private egresadosService: EgresadosService,
    private modalCtrl: ModalController,
    private routerExtService: RouterExtService,
  ) {}

  ionViewWillEnter() {
    const previousUrl = this.routerExtService.getPreviousUrl();
    if (previousUrl === APP_ROUTES.tabs.destacados) {
      this.egresados = [];
      this.loadEgresados();
    }
  }

  ngOnInit() {
    this.loadEgresados();
  }

  async loadEgresados() {
    this.loading = true;
    this.egresadosService.getEgresadosCandidatos(this.pageNumber, this.searchQuery)
      .subscribe((egresados) => {
        this.egresados = egresados;
        this.loading = false;
      });
  }

  setPageNumber(page: number) {
    if (this.lastEgresadosResponse.length > 0) {
      this.pageNumber = page;
      this.loadEgresados();
    }
  }

  handleSearchBarChange(event: any) {
    const query = event.detail.value
    if (query) {
      this.searchQuery = query;
      this.loadEgresados();
      
    } else {
      this.searchQuery = null;
      this.pageNumber = 1;
      this.egresados = [];
      this.loadEgresados();
    }
  }

  async openEgresadoDetailsModal(egresadoId: number) {
    if (!egresadoId) {
      return;
    }

    const egresadoDetailModal = await this.modalCtrl.create({
      component: EgresadoDetailsPage,
      componentProps: {
        egresadoId: egresadoId,
        candidatosMode: true,
      }
    });

    egresadoDetailModal.present();

    const { data, role } = await egresadoDetailModal.onWillDismiss();
    
    if (role === 'confirm') {
      console.log('✨ Modal egresadoDetail closed. ->', data);

      if (data) {
        this.loadEgresados();
      }
    } 
  }
}
