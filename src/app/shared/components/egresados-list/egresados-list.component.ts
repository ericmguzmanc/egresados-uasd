import { Component, OnInit } from '@angular/core';
import { EgresadosService } from '../../services/egresados.service';
import { Egresado } from '../../interfaces/egresado.interface';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-egresados-list',
  templateUrl: './egresados-list.component.html',
  styleUrls: ['./egresados-list.component.scss'],
})
export class EgresadosListComponent  implements OnInit {
  egresados: Egresado[] = [];

  constructor(
    private egresadosService: EgresadosService,
    public helperService: HelperService
  ) { }

  ngOnInit() {
    this.egresadosService.getEgresados()
      .subscribe((egresados: Egresado[]) => {
        this.egresados = egresados;
      });
       
  }

}
