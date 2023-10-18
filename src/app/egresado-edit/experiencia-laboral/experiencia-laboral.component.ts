import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ExperienciaLaboral } from 'src/app/shared/interfaces/egresado.interface';
import { EgresadosService } from 'src/app/shared/services/egresados.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
})

export class ExperienciaLaboralComponent  implements OnInit {
  @Input() egresadoId: number;

  loading = false;
  dateExample = '';

  fechaEntradaMax: string;
  fechaSalidaMin: string;
  fechaSalidaMax: string;
  hideFechaSalida = false;

  experienciaLaboralForm: FormGroup = this.fb.group({
    posicion: ['', [Validators.required, Validators.maxLength(50)]],
    empresa: ['', [Validators.required, Validators.maxLength(50)]],
    fechaEntrada: [new Date().toJSON(), [Validators.required]],
    fechaSalida: [null],
    descripcionPosicion: ['']
  });
  
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private egresadosService: EgresadosService,
    private helperService: HelperService,
    ) { }
    
  ngOnInit() {
    this.fechaSalidaMax = new Date().toISOString();

    this.experienciaLaboralForm.get('fechaEntrada').valueChanges
      .subscribe((value) => {
        this.fechaSalidaMin = value;
      });

    this.experienciaLaboralForm.get('fechaSalida').valueChanges
      .subscribe((value) => {
        this.fechaEntradaMax = value;
      });
  }

  positionToggle(event: any) {
    const checked = event.detail.checked;
    this.hideFechaSalida = checked;
  }

  getFormData(): ExperienciaLaboral {
    const posicion = this.experienciaLaboralForm.get('posicion').value;
    const empresa = this.experienciaLaboralForm.get('empresa').value;
    const FechaEntr = this.helperService.getFormattedDate(this.experienciaLaboralForm.get('fechaEntrada').value);
    const validFechaSal = this.experienciaLaboralForm.get('fechaSalida').value;
    const descripcion = this.experienciaLaboralForm.get('descripcionPosicion').value

    return {
      egresadoId: this.egresadoId,
      posicion,
      empresa,
      salario: null,
      FechaEntr,
      FechaSal: this.hideFechaSalida ? null : this.helperService.getFormattedDate(validFechaSal),
      descripcion,
    }
  }
  
  save() {
    if (this.experienciaLaboralForm.valid) {
      this.loading = true;
      const formData = this.getFormData();

      setTimeout(() => {
        this.egresadosService.addExperienciaLaboralEgresado(formData)
          .subscribe((experienciaLaboral) => {
            this.modalCtrl.dismiss(experienciaLaboral, 'confirm');
          });
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
