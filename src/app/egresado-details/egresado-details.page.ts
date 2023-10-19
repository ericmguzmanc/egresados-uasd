import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Egresado } from '../shared/interfaces/egresado.interface';
import { ActivatedRoute } from '@angular/router';
import { EgresadosService } from '../shared/services/egresados.service';
import { HelperService } from '../shared/services/helper.service';
import { LOADING_TIMEOUT } from '../shared/constants';

@Component({
  selector: 'app-egresado-details',
  templateUrl: './egresado-details.page.html',
  styleUrls: ['./egresado-details.page.scss'],
})
export class EgresadoDetailsPage implements OnInit {
  egresado: Egresado = {};
  loading:boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private egresadoService: EgresadosService,
    public helperService: HelperService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const egresadoId = params['id'];
      if (egresadoId) {
        this.egresadoService.getEgresadoById(egresadoId).subscribe((egresado: Egresado) => {
          this.egresado = egresado;
          //optener edad del egresado apartir de la fecha de nacimiento 
          console.log(this.helperService.getAge(this.egresado.FechaNac));
          console.log(this.egresado);
          setTimeout(() => {
            this.loading = false;
          },LOADING_TIMEOUT)
        });
      }
    });
  }

  onBackButtonClick(): void {
    this.location.back();
  }

}
