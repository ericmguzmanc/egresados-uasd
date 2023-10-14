import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  AlertController, ModalController } from '@ionic/angular';
import { LOADING_TIMEOUT, TIPO_CONTACTO } from 'src/app/shared/constants';
import { Contacto } from 'src/app/shared/interfaces/egresado.interface';
import { EgresadosService } from 'src/app/shared/services/egresados.service';
import { EntitiesService } from 'src/app/shared/services/entities.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss'],
})
export class ContactosComponent  implements OnInit {
  @Input() egresadoId: number;

  private contactoNumberValidators = [
    Validators.minLength(10), 
  ];

  private contactEmailValidators = [
    Validators.email,
  ];

  contactoForm: FormGroup = this.fb.group({
    tipoContacto: ['', [Validators.required]],
    contactoValueNumber: [''],
    contactoValueEmail: [''],
  });

  loading = false;
  contactos: Contacto[];
  tipoContacto = TIPO_CONTACTO;
  
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private egresadoService: EgresadosService,
    private entitiesService: EntitiesService,
    private alertCtrl: AlertController,
    ) { }
    
  get tipodeContactoSeleccionado(): FormControl {
    return this.contactoForm.get('tipoContacto') as FormControl;
  }

  ngOnInit() {
    this.contactoForm = this.fb.group({
      tipoContacto: ['', [Validators.required]],
      contactoValueNumber: ['', this.contactoNumberValidators],
      contactoValueEmail: ['', this.contactEmailValidators],
    });

    this.contactoForm.get('tipoContacto').valueChanges
    .subscribe(value => {
      if(value === this.tipoContacto.EMAIL) {
        this.contactoForm.get('contactoValueEmail').setValidators(this.contactEmailValidators.concat(Validators.required));
      } else {
        this.contactoForm.get('contactoValueNumber').setValidators(this.contactoNumberValidators.concat(Validators.required));
      }

      this.contactoForm.get('contactoValueEmail').patchValue('');
      this.contactoForm.get('contactoValueNumber').patchValue('');
    });
  }
  
  confirm() {
    this.save();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    if (this.contactoForm.valid) {
      this.loading = true;
      const contacto = this.getContactoParams();

      this.entitiesService.getContactoByTipoAndValor({ tipo: contacto.tipo, valor: contacto.valor })
        .subscribe(async (exists) => {
            if (exists.length >= 1) {
              const alert = await this.alertCtrl.create({
                header: "Contacto existe",
                message: "Este contacto ya existe",
                buttons: [
                  {
                    text: "Ok",
                    role: "confirm",
                  }
                ]
              });

              await alert.present();
            } else {
              setTimeout(() => {
                this.egresadoService.addContactoEgresado(contacto)
                .subscribe((contacto) => {
                  this.loading = false;
                  return this.modalCtrl.dismiss(contacto, 'confirm');
                });
              }, LOADING_TIMEOUT);
            }
        });
    }
  }

  getContactoParams(): Contacto {
    const tipoContacto = this.contactoForm.get('tipoContacto').value;
    const contactoValueEmail = this.contactoForm.get('contactoValueEmail').value;
    const contactoValueNumber = this.contactoForm.get('contactoValueNumber').value;
    return {
      egresadoId: this.egresadoId,
      tipo: tipoContacto,
      valor: tipoContacto === this.tipoContacto.EMAIL ? contactoValueEmail : contactoValueNumber,
    }
  }
}
