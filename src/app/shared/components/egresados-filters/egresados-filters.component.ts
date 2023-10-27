import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { SharedModule } from '../../shared.module';
import { IonicSelectableComponent } from 'ionic-selectable';
import { TIPO_TITULO } from '../../constants';
import { EntitiesService } from '../../services/entities.service';
import { forkJoin } from 'rxjs';
import { Provincia } from '../../interfaces/provincia.interface';
import { egresadosFilters } from '../../interfaces/egresadosFilters.interface';

@Component({
  selector: 'app-egresados-filters',
  templateUrl: './egresados-filters.component.html',
  styleUrls: ['./egresados-filters.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    IonicSelectableComponent,
  ],
})
export class EgresadosFiltersComponent implements OnInit {
  @Input() egresadosFilters: egresadosFilters;
  @Input() destacadosMode: boolean;

  tipoTitulo = TIPO_TITULO;
  habilidades: any[];
  provincias: Provincia[];
  fechaEntradaMax: string;
  fechaSalidaMin: string;
  fechaSalidaMax: string;
  dateRangeEnabled: boolean = true;

  filtrosForm: FormGroup = this.fb.group({
    rangoFechaInicio: [new Date().toJSON()],
    rangoFechaFin: [new Date().toJSON()],
    tituloTipos: [null],
    habilidades: [null],
    provincias: [null],
    destacados: [false],
    dateRangeDisabled: [false]
  });

  constructor(
    private modalCtrl: ModalController,
    private entitiesService: EntitiesService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  get rangoFechaInicio() {
    return this.filtrosForm.get('rangoFechaInicio').value;
  }

  get rangoFechaFin() {
    return this.filtrosForm.get('rangoFechaFin').value;
  }


  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });

    // Si está el modo destacado true, entonces setea el form con el valor true
    this.filtrosForm.patchValue({ destacados: this.destacadosMode });

    forkJoin([
      this.entitiesService.getProvincias(),
      this.entitiesService.getHabilidades(),
    ]).subscribe(([provincias, habilidades ]) => {
      this.provincias = provincias;
      this.habilidades = habilidades;

      if (this.egresadosFilters) {
        this.loadEgresadosFiltersForm();
      }
      
      loading.dismiss();
    });

    // Set the date picker max and min limints
    this.fechaSalidaMax = new Date().toISOString();

    this.filtrosForm.get('rangoFechaInicio').valueChanges
      .subscribe((value) => {
        this.fechaSalidaMin = value;
      });

    this.filtrosForm.get('rangoFechaFin').valueChanges
      .subscribe((value) => {
        this.fechaEntradaMax = value;
      });
  }

  loadEgresadosFiltersForm() {
    const { destacados, rangoFechaInicio, rangoFechaFin, dateRangeDisabled, habilidades, tituloTipos, provincias } = this.egresadosFilters;

    this.dateRangeEnabled = !dateRangeDisabled

    // Cargamos los valores al formulario
    this.filtrosForm.patchValue({
      destacados,
      rangoFechaInicio,
      rangoFechaFin,
      dateRangeDisabled,
      tituloTipos,
      habilidades,
      provincias,
    });

  }

  async clearFiltrosFormConfirmation() {
    const alert = await this.alertCtrl.create({
      header: 'Cuidado!',
      subHeader: 'Mensaje Importante',
      message: 'Si procede perderá todas sus selecciones previas.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('✨ Alerta Cancelada');
          },
        },
        {
          text: 'Aceptar',
          role: 'Confirmar',
          handler: () => {
            console.log('✨ Alerta Aceptada');
            this.dateRangeEnabled = true;
            this.clearFiltrosForm();
          },
        },
      ],
    });

    await alert.present();
  }

  clearFiltrosForm() {
    this.filtrosForm.reset();
    this.modalCtrl.dismiss(null, 'confirm');
  }

  toggleDateRange() {
    this.dateRangeEnabled = !this.dateRangeEnabled;
  }

  close() {
    this.modalCtrl.dismiss({}, 'cancel');
  }

  async filtrar() {
    if (this.dateRangeEnabled && (this.rangoFechaInicio === this.rangoFechaFin)) {
      const alert = await this.alertCtrl.create({
        header: 'Notificación!',
        subHeader: 'Rango de Fecha Inválido',
        message: 'Las fechas de inicio y fecha fin del rango de tiempo no pueden ser iguales',
        buttons: [
          {
            text: 'Ok',
            role: 'Confirmar',
            handler: () => {
              console.log('✨ Alerta Aceptada');
            },
          },
        ],
      });
  
      await alert.present();
    } else {
      this.modalCtrl.dismiss(this.filtrosForm.value, 'confirm');
    }
  }
}
