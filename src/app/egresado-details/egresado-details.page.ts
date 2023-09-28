import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Egresado } from '../shared/interfaces/egresado.interface';
import { ActivatedRoute } from '@angular/router';
import { EgresadosService } from '../shared/services/egresados.service';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-egresado-details',
  templateUrl: './egresado-details.page.html',
  styleUrls: ['./egresado-details.page.scss'],
})
export class EgresadoDetailsPage implements OnInit {
  egresado: Egresado = {};
  loadingEgresado = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private egresadoService: EgresadosService,
    public helperService: HelperService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadingEgresado = false;
    }, 2000);

    this.route.params.subscribe(params => {
      const egresadoId = params['id'];
      if (egresadoId) {
        this.egresadoService.getEgresadoById(egresadoId).subscribe((egresado: Egresado) => {
          console.log('🚀 ~ file: egresado-details.page.ts:34 ~ EgresadoDetailsPage ~ this.egresadoService.getEgresadoById ~ egresado:', egresado)
          this.egresado = egresado;
          this.loadingEgresado = false;
        });
      }
    });
  }

  onBackButtonClick(): void {
    this.location.back();
  }

}
