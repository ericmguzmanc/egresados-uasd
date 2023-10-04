import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Egresado } from '../interfaces/egresado.interface';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
  
  constructor(private http: HttpClient) { }

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

  

}