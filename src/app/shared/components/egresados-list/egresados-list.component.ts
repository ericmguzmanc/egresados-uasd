import { Component, OnInit } from '@angular/core';
import { EgresadosService } from '../../services/egresados.service';
import { Egresado } from '../../interfaces/egresado.interface';

@Component({
  selector: 'app-egresados-list',
  templateUrl: './egresados-list.component.html',
  styleUrls: ['./egresados-list.component.scss'],
})
export class EgresadosListComponent  implements OnInit {
  egresados: Egresado[] = [];

  constructor(private egresadosService: EgresadosService) { }

  ngOnInit() {
    this.egresadosService.getEgresados()
      .subscribe((egresados: Egresado[]) => {
        this.egresados = egresados;
      });
  }

  getLatestPosition(egresado: Egresado): string | undefined {
    const { experienciaLaboralEgresado } = egresado;
    const latestPosition = experienciaLaboralEgresado?.filter(ex => !ex.FechaSal)[0];

    return latestPosition ? latestPosition?.posicion : "No Tiene experiencia Laboral";
  }

}
