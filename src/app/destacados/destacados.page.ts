import { Component, OnInit } from '@angular/core';
import { EgresadosService } from '../shared/services/egresados.service';
import { Egresado } from '../shared/interfaces/egresado.interface';
import { HelperService } from '../shared/services/helper.service';
import { APP_ROUTES } from '../shared/constants';
import { ModalController } from '@ionic/angular';
import { EgresadoDetailsPage } from '../egresado-details/egresado-details.page';
import { EgresadosFiltersComponent } from '../shared/components/egresados-filters/egresados-filters.component';
import { egresadosFilters } from '../shared/interfaces/egresadosFilters.interface';
import { environment } from 'src/environments/environment';
import { RouterExtService } from '../shared/services/RouterExt.service';
@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.page.html',
  styleUrls: ['./destacados.page.scss'],
})
export class DestacadosPage implements OnInit {
  egresados: Egresado[] = [];
  lastEgresadosResponse: Egresado[] = [];
  loading: boolean = true;
  pageNumber: number = 1;
  searchQuery: string;
  egresadosFilters: egresadosFilters;
  
  constructor(
    private egresadosService: EgresadosService,
    public helperService: HelperService,
    private modalCtrl: ModalController,
    private routerExtService: RouterExtService
  ) {}

  ngOnInit() {
    this.loadEgresados();
  }

  ionViewWillEnter() {
    const previousUrl = this.routerExtService.getPreviousUrl();
    if (previousUrl === APP_ROUTES.tabs.candidatos) {
      this.egresados = [];
      this.loadEgresados();
    }
  }
  
  loadEgresados() {
    this.loading = true;

    if (this.egresadosFilters && environment.production) {
      console.log('Production Mode !!! 🚨');
      this.applyFilters();
    } else {
      this.egresadosService.getEgresados(this.pageNumber, this.searchQuery)
        .subscribe((egresados: Egresado[]) => {
          const destacados = egresados.filter((ex) => ex.destacado);
          if (this.searchQuery) {
            this.egresados = [...destacados];
          } else {
            this.egresados = [...this.egresados, ...destacados];
          }

          this.lastEgresadosResponse = egresados;
          this.loading = false;
        });
    }
  }

  setPageNumber(page: number) {
    if (this.lastEgresadosResponse.length > 0) {
      this.pageNumber = page;
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
      }
    });

    egresadoDetailModal.present();

    const { data, role } = await egresadoDetailModal.onWillDismiss();
    
    if (role === 'confirm') {
      console.log('✨ Modal egresadoDetail closed. ->', data);
      if (data) {
        this.egresados = [];
        this.loadEgresados();
      }
    } 
  }

  async openEgresadosFiltersModal() {
    const egresadosFiltersModal = await this.modalCtrl.create({
      component: EgresadosFiltersComponent,
      componentProps: {
        egresadosFilters: this.egresadosFilters,
        destacadosMode: true,
      }
    });

    egresadosFiltersModal.present();

    const { data, role } = await egresadosFiltersModal.onWillDismiss();

    if (role === 'confirm') {
      this.egresadosFilters = data;
      this.pageNumber = 1;
      this.egresados = [];
      
      if (this.egresadosFilters && environment.production) {
        // Llamar la funcion de aplicar filtros
        this.applyFilters();
      } else {
        this.loadEgresados();
      }
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

  applyFilters() {
    if (this.egresadosFilters) {
      this.egresadosService.filterEgresados(this.egresadosFilters, this.pageNumber, this.searchQuery)
        .subscribe((egresados) => {
          if (this.searchQuery) {
            this.egresados = [...egresados];
          } else {
            this.egresados = [...egresados];
          }

          this.lastEgresadosResponse = egresados;
          this.loading = false;
        });
    }
  }
}