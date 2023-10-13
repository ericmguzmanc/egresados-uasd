import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacto, Educacion, Egresado, EgresadosHabilidad, ExperienciaLaboral, Idioma } from '../shared/interfaces/egresado.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { EgresadosService } from '../shared/services/egresados.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { ContactosComponent } from './contactos/contactos.component';
import { ExperienciaLaboralComponent } from './experiencia-laboral/experiencia-laboral.component';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-egresado-edit',
  templateUrl: './egresado-edit.page.html',
  styleUrls: ['./egresado-edit.page.scss'],
})
export class EgresadoEditPage implements OnInit {
  @ViewChild(IonModal) IdiomaModal: IonModal;
  @ViewChild(IonModal) HabilidadesModal: IonModal;

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

  constructor(
    private route: ActivatedRoute,
    private egresadoService: EgresadosService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private modalCtrl: ModalController,
    private helperService: HelperService
  ) { }

  get idiomaEgresadoArray(): FormArray {
    return this.egresadoForm.get('idiomaEgresado') as FormArray;
  }

  get nacionalidadEgresadoArray(): FormArray {
    return this.egresadoForm.get('nacionalidadEgresado') as FormArray;
  }

  get experienciaLaboralEgresadoArray(): FormArray {
    return this.egresadoForm.get('experienciaLaboralEgresado') as FormArray;
  }

  get educacionEgresadoArray(): FormArray {
    return this.egresadoForm.get('educacion') as FormArray;
  }

  get contactoEgresadoArray(): FormArray {
    return this.egresadoForm.get('contacto') as FormArray;
  }

  get habilidadesEgresadoArray(): FormArray {
    return this.egresadoForm.get('egresadosHabilidad') as FormArray;
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

  async savedConfirmation() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Cambios Guardados',
      message: `Los cambios al perfil del egresado ${this.egresado.Nombre} ${this.egresado.ApellidoPaterno} han sido guardados.`,
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
      this.egresadoForm.setControl('egresadosHabilidad', this.fb.array(this.fillHabilidadesArray()))
    }
  }

  fillHabilidadesArray() {
    const habilidades = [];

    if (this.egresado?.egresadosHabilidad && this.egresado?.egresadosHabilidad.length > 0) {
      for (const habilidad of this.egresado?.egresadosHabilidad) {
        habilidades.push(
          this.createHabilidadFormGroup(habilidad)
        );
      }
    }

    return habilidades;
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

  private createHabilidadFormGroup(habilidad: EgresadosHabilidad) {
    return this.fb.group({
      id: new FormControl(habilidad?.id || 0),
      egresadoId: new FormControl(habilidad?.egresadoId || this.egresado.id),
      habilidad: new FormControl(habilidad?.habilidad || ''),
    });
  }

  private createIdiomaFormGroup(idioma?: Idioma): FormGroup {
    return this.fb.group({
        id: new FormControl(idioma?.id || 0),
        egresadoId: new FormControl(idioma?.egresadoId || this.egresado.id),
        idioma: new FormControl(idioma?.idioma || ''),
    });
  }

  private createExperienciaLaboralFormGroup(experiencia?: ExperienciaLaboral): FormGroup {
    return this.fb.group({
      id: new FormControl(experiencia?.id),
      empresa: new FormControl(experiencia?.empresa),
      posicion: new FormControl(experiencia?.posicion),
      salario: new FormControl(experiencia?.salario),
      FechaEntr: new FormControl(experiencia?.FechaEntr),
      FechaSal: new FormControl(experiencia?.FechaSal)
    });
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

  private createContactoEgresadoFormGroup(contacto?: Contacto): FormGroup {
    return this.fb.group({
      id: new FormControl(contacto?.id),
      egresadoId: new FormControl(contacto?.egresadoId),
      tipo: new FormControl(contacto?.tipo),
      valor: new FormControl(contacto?.valor)
    });
  }

  addIdiomaEgresado(idiomas: Idioma[] | undefined) {
    this.loading = true;

    if (idiomas.length > 0) {
      this.idiomaEgresadoArray.clear();
      this.egresado.idiomaEgresado = [];
      
      idiomas.forEach((idioma) => {
        this.idiomaEgresadoArray.push(this.createIdiomaFormGroup(idioma));
        this.egresado.idiomaEgresado?.push({
          ...idioma,
          idiomaId: idioma.idiomaId,
          egresadoId: this.egresado.id,
        });
      });
    }
  }

  addHabilidadEgresado(habilidades: EgresadosHabilidad[] | undefined) {
    this.loading = true;

    if (habilidades.length > 0) {
      this.habilidadesEgresadoArray.clear();
      this.egresado.egresadosHabilidad = [];
      
      habilidades.forEach((habilidad) => {
        this.habilidadesEgresadoArray.push(this.createHabilidadFormGroup(habilidad));
        this.egresado.egresadosHabilidad?.push({
          ...habilidad,
          habilidadId: habilidad.habilidadId,
          egresadoId: this.egresado.id,
        });
      });
    }
  }

  addContactoEgresado(contacto: Contacto) {
    this.contactoEgresadoArray.push(this.createContactoEgresadoFormGroup(contacto));
    this.egresado.contacto.push(contacto);
  }

  addExperienciaLaboralEgresado(experienciaLaboral: ExperienciaLaboral) {
    this.experienciaLaboralEgresadoArray.push(this.createExperienciaLaboralFormGroup(experienciaLaboral));
    this.egresado.experienciaLaboralEgresado.push(experienciaLaboral);

    this.egresado.experienciaLaboralEgresado = this.helperService
      .sortByDate(this.egresado.experienciaLaboralEgresado, 'FechaEntr', 'FechaEntr');;

    this.experienciaLaboralEgresadoArray.controls.sort((a,b) => {
      return new Date(b.value.FechaEntr).getTime() - new Date(a.value.FechaEntr).getTime();
    });
  }

  deleteContactoEgresado(contactoId: number) {
    this.egresadoService.deleteContactoEgresado(contactoId)
      .subscribe(async (_) => {
        this.contactoEgresadoArray.clear();
        this.egresado.contacto = this.egresado.contacto.filter((contacto) => contacto.id != contactoId);
        this.egresado.contacto.forEach((contacto) => {
          this.contactoEgresadoArray.push(this.createContactoEgresadoFormGroup(contacto));
        });

        const alert = await this.alertController.create({
          header: 'Contacto borrado',
          subHeader: '',
          message: 'El contacto ha sido borrado con éxito',
          buttons: [
            {
              text: 'Ok',
              role: '',
            },
          ],
        });
        

        await alert.present();
      });
  }

  deleteExperienciaLaboralEgresado(experienciaLaboralEgresadoId: number) {
    this.egresadoService.deleteExperienciaLaboralEgresado(experienciaLaboralEgresadoId)
      .subscribe(async (_) => {
        this.experienciaLaboralEgresadoArray.clear();
        this.egresado.experienciaLaboralEgresado = this.egresado.experienciaLaboralEgresado.filter((el) => el.id != experienciaLaboralEgresadoId);
        this.egresado.experienciaLaboralEgresado.forEach((experienciaLaboral) => {
          this.experienciaLaboralEgresadoArray.push(this.createExperienciaLaboralFormGroup(experienciaLaboral));
        });

        const alert = await this.alertController.create({
          header: 'Experiencia Borrada',
          message: 'La experiencia laboral se ha borrado con éxito',
          buttons: [
            {
              text: 'Ok',
              role: '',
            }
          ]
        });

        await alert.present();
      });
  }

  save() {
    if (this.egresadoForm.valid) {
      const egresado = this.buildEgresadoUpdateObject();
      
      this.egresadoService.updateEgresado(egresado)
      .subscribe(() => {
        this.savedConfirmation();
      });
    }
  }

  buildEgresadoUpdateObject() {
    const { Nombre, ApellidoPaterno, ApellidoMaterno, Cedula, Genero, FechaNac, Pasaporte, about} = this.egresadoForm.value
    return {
      id: this.egresado.id,
      Nombre, 
      ApellidoPaterno,
      ApellidoMaterno,
      Cedula,
      Genero,
      FechaNac,
      Pasaporte,
      about
    }
  }

  async onCancelClick() {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      subHeader: 'Mensaje Importante',
      message: 'Si sale de la edición de perfil, se perderán los cambios no guardados.',
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

  async openIdiomasModal() {
    const idiomasModal = await this.modalCtrl.create({
      component: IdiomasComponent,
      componentProps: { 
        idiomasEgresado: this.egresado.idiomaEgresado,
        egresadoId: this.egresado.id,
      }
    });

    idiomasModal.present();

    const { data, role } = await idiomasModal.onWillDismiss();

    if (role === 'confirm') {
      this.addIdiomaEgresado(data);
    } else {
      console.log('Modal closed cancelled')
    }
  }

  async openHabilidadesModal() {
    const habilidadesModal = await this.modalCtrl.create({
      component: HabilidadesComponent,
      componentProps: { 
        egresadosHabilidad: this.egresado.egresadosHabilidad,
        egresadoId: this.egresado.id,
      }
    });

    habilidadesModal.present();

    const { data, role } = await habilidadesModal.onWillDismiss();

    if (role === 'confirm') {
      this.addHabilidadEgresado(data);
    } else {
      console.log('Modal closed cancelled')
    }

  }

  async openContactoModal() {
    const contactoModal = await this.modalCtrl.create({
      component: ContactosComponent,
      componentProps: {
        egresadoId: this.egresado.id,
      }
    });

    contactoModal.present();

    const { data, role } = await contactoModal.onWillDismiss();
    
    if (role === 'confirm') {
      this.addContactoEgresado(data);
    } else {
      console.log('Modal closed cancelled')
    }
  }

  async openExperienciaLaboralModal() {
    const experienciaLaboralModal = await this.modalCtrl.create({
      component: ExperienciaLaboralComponent,
      componentProps: {
        egresadoId: this.egresado.id,
      }
    });

    experienciaLaboralModal.present();

    const { data, role } = await experienciaLaboralModal.onWillDismiss();
    
    if (role === 'confirm') {
      this.addExperienciaLaboralEgresado(data);
    } else {
      console.log('Modal closed cancelled')
    }
  }
}
