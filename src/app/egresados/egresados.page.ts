import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { EgresadosService } from '../shared/services/egresados.service';
import { Egresado } from '../shared/interfaces/egresado.interface';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-egresados',
  templateUrl: './egresados.page.html',
  styleUrls: ['./egresados.page.scss'],
})
export class EgresadosPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  egresados: Egresado[] = [];
  loading: boolean = true;
  time: number = 1000;
  constructor(private egresadosService: EgresadosService,
    public helperService: HelperService) { }

  ngOnInit() {
    this.egresadosService.getEgresados()
      .subscribe((egresados: Egresado[]) => {
        this.egresados = egresados;
        setTimeout(() => {
          this.loading = false;
          },this.time)
      });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
