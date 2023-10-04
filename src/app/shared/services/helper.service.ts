import { Injectable } from '@angular/core';
import { Egresado } from '../interfaces/egresado.interface';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getLatestPosition(egresado: Egresado): string | undefined {
    const { experienciaLaboralEgresado } = egresado;
    const latestPosition = experienciaLaboralEgresado?.filter(ex => !ex.FechaSal)[0];

    return latestPosition ? latestPosition?.posicion : "No Tiene experiencia Laboral";
  }
}