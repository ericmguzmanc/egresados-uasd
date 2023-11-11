import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EgresadosService } from '../shared/services/egresados.service';
import { Egresado } from '../shared/interfaces/egresado.interface';
import { EgresadoDetailsPage } from '../egresado-details/egresado-details.page';
import { EgresadosFiltersComponent } from '../shared/components/egresados-filters/egresados-filters.component';
import { egresadosFilters } from '../shared/interfaces/egresadosFilters.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/services/auth.service';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-egresados',
  templateUrl: './egresados.page.html',
  styleUrls: ['./egresados.page.scss'],
})
export class EgresadosPage implements OnInit {
  name: string = '';
  egresados: Egresado[] = [];
  lastEgresadosResponse: Egresado[] = [];
  pageNumber: number = 1;
  results: Egresado[];
  loading: boolean = false;
  searchQuery: string;
  egresadosFilters: egresadosFilters;
  isUserAdmin: boolean;

  constructor(
    private egresadosService: EgresadosService,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private helperService: HelperService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.loadEgresados();

    this.authService.loggedUserRole
      .subscribe((rol) => {
        this.isUserAdmin = this.helperService.isUserAdmin(rol);
      });

  }

  async loadEgresados() {
    if (this.egresadosFilters && environment.production) {
      console.log('Production Mode !!! 🚨');
      this.applyFilters();
    } else {
      this.egresadosService.getEgresados(this.pageNumber, this.searchQuery)
        .subscribe((egresados: Egresado[]) => {
          if (this.searchQuery) {
            this.egresados = [...egresados];
          } else {
            this.egresados = [...this.egresados, ...egresados];
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
      }
    });

    egresadoDetailModal.present();

    const { data, role } = await egresadoDetailModal.onWillDismiss();
    
    if (role === 'confirm') {
      console.log('✨ Modal egresadoDetail closed. ->', data);
      if (data) {
        this.applyEgresadoDetailsChange(data);
      }
    } 
  }

  async openEgresadosFiltersModal() {
    const egresadosFiltersModal = await this.modalCtrl.create({
      component: EgresadosFiltersComponent,
      componentProps: {
        egresadosFilters: this.egresadosFilters,
        destacadosMode: false,
        isUserAdmin: this.isUserAdmin
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

  applyEgresadoDetailsChange(updatedEgresado: Egresado) {
    this.egresados = this.egresados.map((egresado) => {

      if (egresado.id === updatedEgresado.id) {
        egresado = updatedEgresado;
      }

      return egresado
    });
  }
}
