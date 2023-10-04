import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacto, Educacion, Egresado, ExperienciaLaboral, Idioma } from '../shared/interfaces/egresado.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { EgresadosService } from '../shared/services/egresados.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-egresado-edit',
  templateUrl: './egresado-edit.page.html',
  styleUrls: ['./egresado-edit.page.scss'],
})
export class EgresadoEditPage implements OnInit {
  @ViewChild(IonModal) IdiomaModal: IonModal;

  loading = false;
  egresado: Egresado = {};
  egresadoForm: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required, Validators.maxLength(100)]],
    ApellidoPaterno: ['', [Validators.required, Validators.maxLength(100)]],
    ApellidoMaterno: ['', [Validators.maxLength(100)]],
    Cedula: ['', [Validators.required, Validators.maxLength(11)]],
    Pasaporte: [''],
    Genero: [''],
    FechaNac: ['', [Validators.required]],
    about: ['', [Validators.maxLength(300)]],
    contacto: this.fb.array([]),
    nacionalidadEgresado: this.fb.array([]),
    idiomaEgresado: this.fb.array([]),
    experienciaLaboralEgresado: this.fb.array([]),
    egresadosHabilidad: this.fb.array([]),
    educacion: this.fb.array([]),
  });;

  IdiomaModalMessage = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: String;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private egresadoService: EgresadosService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
  ) { }

  get idiomaEgresadoArray(): FormArray {
    return this.egresadoForm.get('idiomaEgresado') as FormArray;
  }

  get nacionalidadEgresadoArray(): FormArray {
    return this.egresadoForm.get('nacionalidadEgresado') as FormArray;
  }

  get experienciaLaboralEgresado(): FormArray {
    return this.egresadoForm.get('experienciaLaboralEgresado') as FormArray;
  }

  get educacionEgresadoArray(): FormArray {
    return this.egresadoForm.get('educacion') as FormArray;
  }

  get contactoEgresadoArray(): FormArray {
    return this.egresadoForm.get('contacto') as FormArray;
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      const egresadoId = params['id'];
      if (egresadoId) {
        this.egresadoService.getEgresadoById(egresadoId).subscribe((egresado: Egresado) => {
          this.egresado = egresado;          
          this.loading = false;
          this.loadEgresadoForm();
        });
      }
    });
  }

  onBackButtonClick(): void {
    this.location.back();
  }

  loadEgresadoForm(): void {
    if (this.egresado.Nombre) {
      const { Nombre, ApellidoPaterno, ApellidoMaterno, Cedula, Pasaporte, Genero, FechaNac, about } = this.egresado
      this.egresadoForm.patchValue({
        Nombre,
        ApellidoPaterno,
        ApellidoMaterno,
        Cedula,
        Pasaporte,
        Genero,
        FechaNac,
        about,
      });

      this.egresadoForm.setControl('idiomaEgresado', this.fb.array(this.fillIdiomaArray()));
      this.egresadoForm.setControl('experienciaLaboralEgresado', this.fb.array(this.fillExperienciaLaboralArray()));
      this.egresadoForm.setControl('educacion', this.fb.array(this.fillEducacionEgresadoArray()));
      this.egresadoForm.setControl('contacto', this.fb.array(this.fillContactoEgresadoArray()));
    }
  }

  fillIdiomaArray() {
    const idiomas = [];
    if (this.egresado?.idiomaEgresado && this.egresado?.idiomaEgresado.length > 0) {
      for (const idioma of this.egresado?.idiomaEgresado) {
        idiomas.push(
          this.createIdiomaFormGroup(idioma)
        );
      }
    }
    return idiomas;
  }

  addNewIdiomaEgresado() {
    this.idiomaEgresadoArray.push(this.createIdiomaFormGroup());
  }

  private createIdiomaFormGroup(idioma?: Idioma): FormGroup {
    return this.fb.group({
        id: new FormControl(idioma?.id || 0),
        egresadoId: new FormControl(idioma?.egresadoId || 0),
        idioma: new FormControl(idioma?.idioma || ''),
    });
  }

  fillExperienciaLaboralArray() {
    const experiencias = [];
    if (this.egresado?.experienciaLaboralEgresado && this.egresado?.experienciaLaboralEgresado.length > 0) {
      for (const experiencia of this.egresado?.experienciaLaboralEgresado) {
        experiencias.push(
          this.createExperienciaLaboralFormGroup(experiencia)
        );
      }
    }
    return experiencias;
  }

  private createExperienciaLaboralFormGroup(experiencia?: ExperienciaLaboral): FormGroup {
    return this.fb.group({
      empresa: new FormControl(experiencia?.empresa),
      posicion: new FormControl(experiencia?.posicion),
      Salario: new FormControl(experiencia?.Salario),
      FechaEntr: new FormControl(experiencia?.FechaEntr),
      FechaSal: new FormControl(experiencia?.FechaSal)
    });
  }

  fillEducacionEgresadoArray() {
    const educaciones = [];
    if (this.egresado?.educacion && this.egresado?.educacion.length > 0) {
      for (const educacion of this.egresado?.educacion) {
        educaciones.push(
          this.createEducacionEgresadoFormGroup(educacion)
        );
      }
    }
    return educaciones;
  }

  private createEducacionEgresadoFormGroup(educacion?: Educacion): FormGroup {
    return this.fb.group({
      Universidad: new FormControl(educacion?.Universidad),
      FechaEntr: new FormControl(educacion?.FechaEntr),
      FechaSal: new FormControl(educacion?.FechaSal),
      Titulo: new FormControl(educacion?.Titulo),
      TipoTitulo: new FormControl(educacion?.TipoTitulo),
    });
  }

  fillContactoEgresadoArray() {
    const contactos = [];
    if (this.egresado?.contacto && this.egresado?.contacto.length > 0) {
      for (const contacto of this.egresado?.contacto) {
        contactos.push(
          this.createContactoEgresadoFormGroup(contacto)
        );
      }
    }
    return contactos;
  }

  private createContactoEgresadoFormGroup(contacto?: Contacto): FormGroup {
    return this.fb.group({
      tipo: new FormControl(contacto?.tipo),
      valor: new FormControl(contacto?.valor)
    });
  }

  save() {
    console.log('🚀 ~ file: egresado-edit.page.ts:66 ~ save ~ this.egresadoForm.value:', this.egresadoForm.value)
  }

  async onCancelClick() {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      subHeader: 'Mensaje Importante',
      message: 'Si cancela la edición de perfil, se perderán los cambios.',
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
            this.router.navigate(['/tabs/egresados']);
          },
        },
      ],
    });

    await alert.present();
  }

  cancel() {
    this.IdiomaModal.dismiss(null, 'cancel');
  }

  confirm() {
    this.IdiomaModal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.IdiomaModalMessage = `Hello, ${ev.detail.data}!`;
    }
  }

}
