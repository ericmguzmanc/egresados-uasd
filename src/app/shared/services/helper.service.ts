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

  getTipoTituloEgresado(egresado: Egresado): string | undefined {
     const{educacion} = egresado;
     const titulo = educacion?.filter(ed => ed.TipoTitulo )[0];
     if(titulo?.TipoTitulo =='Licenciatura'){
        return "Lic.";
     }else if(titulo?.TipoTitulo =='Ingeniería'){
        return "Ing.";
     }
     return titulo ? titulo?.TipoTitulo : " ";
  }
  
  getLatestEmpresa(egresado: Egresado): string | undefined {
    const { experienciaLaboralEgresado } = egresado;
    const latestEmpresa = experienciaLaboralEgresado?.filter(ex => !ex.FechaSal)[0];
    return latestEmpresa ? latestEmpresa?.empresa : "";
  }

  sortByDate<T extends Record<string, any>>(array: T[], startDate: keyof T, endDate: keyof T) {
    return array.sort((a: T, b: T) => {
      return new Date(b[startDate]).getTime() - new Date(a[endDate]).getTime();
    });
  }

  getFormattedDate(value: string, addDays: number = 0) {
    const date = new Date(value);
    const day = date.getDate() + addDays;
    const year = date.getFullYear();
    const month = date.getMonth();

    return `${year}-${month + 1}-${day}`;
  }
}