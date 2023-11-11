import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Carrera } from 'src/app/shared/interfaces/carrera.interface';
import { EntitiesService } from 'src/app/shared/services/entities.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HelperService } from 'src/app/shared/services/helper.service';
import { LOADING_TIMEOUT, TIPO_TITULO } from 'src/app/shared/constants';
import { EgresadosService } from 'src/app/shared/services/egresados.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    IonicSelectableComponent
  ]
})
export class EducacionComponent  implements OnInit {
  @Input() egresadoId: number;

  loading = false;
  carreras: Carrera[];
  carrera: string;

  fechaEntradaMax: string;
  fechaSalidaMin: string;
  fechaSalidaMax: string;
  tipoTitulo = TIPO_TITULO

  educacionForm: FormGroup = this.fb.group({
    carrera: ['', [Validators.required]],
    tipoTitulo: [ '', [Validators.required]],
    fechaEntrada: [new Date().toJSON(), [Validators.required]],
    fechaSalida: [new Date().toJSON(), [Validators.required]]
  });

  get nivelCarrera() {
    return this.educacionForm.get('tipoTitulo').value.nivel;
  }

  get nombreCarrera() {
    return this.educacionForm.get('carrera').value.NombreCarrera;
  }

  get isCarreraControlValid() {
    return !this.educacionForm.get('carrera').valid 
    && this.educacionForm.touched;
  }

  get isTipoTituloControlValid() {
    return !this.educacionForm.get('tipoTitulo').valid 
    && this.educacionForm.touched;
  }

  constructor(
    private modalCtrl: ModalController,
    private entitiesService: EntitiesService,
    private helperService: HelperService,
    private egresadosService: EgresadosService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.entitiesService.getCarreras()
      .subscribe((carreras) => {
        if (carreras) {
          this.carreras = carreras;
        }
        this.loading = false;
      });

    this.fechaSalidaMax = new Date().toISOString();

    this.educacionForm.get('fechaEntrada').valueChanges
      .subscribe((value) => {
        this.fechaSalidaMin = value;
      });

    this.educacionForm.get('fechaSalida').valueChanges
      .subscribe((value) => {
        this.fechaEntradaMax = value;
      });
  }

  isFechaEntradaToday(): boolean {
    const formFechaEntrada = new Date(this.educacionForm.get('fechaEntrada').value);
    const today = new Date();
    const formDateWithoutTime = new Date(formFechaEntrada.getFullYear(), formFechaEntrada.getMonth(), formFechaEntrada.getDate());
    const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return formDateWithoutTime.toDateString() == todayWithoutTime.toDateString();
  }

  async showDateAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Fechas Inválidas',
      message: `Por favor seleccione fechas válidas. La fecha de inicio no puede ser igual a hoy.`,
      buttons: [
        {
          text: 'OK',
          role: 'Confirmar',
          handler: () => {
            console.log('✨ Alerta Aceptada');
          },
        },
      ],
    });

    await alert.present();
  }

  getFormData() {
    const FechaEntr = this.helperService.getFormattedDate(this.educacionForm.get('fechaEntrada').value);
    const FechaSal = this.helperService.getFormattedDate(this.educacionForm.get('fechaSalida').value);
    const TipoTitulo = this.educacionForm.get('tipoTitulo').value;
    const carrera = this.educacionForm.get('carrera').value as Carrera;

    return {
      egresadoId: this.egresadoId,
      Universidad: 'Universidad Autónoma de Santo Domingo',
      FechaEntr,
      FechaSal,
      carreraId: carrera.id,
      Titulo: carrera.NombreCarrera,
      TipoTitulo: TipoTitulo.nivel,
    } 
  }

  save() {
    if (this.isFechaEntradaToday()) {
      this.educacionForm.setErrors({ dateInvalid: true });
      this.showDateAlert();
    }

    if (this.educacionForm.valid) {
      const educacionEgresado = this.getFormData();
      this.entitiesService.getEducacionByEgresadoAndTitle({ 
        egresadoId: this.egresadoId,
        titulo: educacionEgresado.Titulo,
        tipoTitulo: educacionEgresado.TipoTitulo
      })
      .subscribe(async (exists) => {
        if (exists.length >= 1) { 
          const alert = await this.alertCtrl.create({
            header: "Educacion existe",
            message: "Este Record Educativo ya existe",
            buttons: [
              {
                text: "Ok",
                role: "confirm",
              }
            ]
          });
          
          await alert.present();
        } else {
          this.loading = true;
          setTimeout(() => {
            this.egresadosService.addEducacionEgresado(educacionEgresado)
              .subscribe((educacion) => {
                this.loading = false;
                this.modalCtrl.dismiss(educacion, 'confirm');
              });
          }, LOADING_TIMEOUT)
        }
      });
    }
  }

  confirm() {
    this.save();
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}