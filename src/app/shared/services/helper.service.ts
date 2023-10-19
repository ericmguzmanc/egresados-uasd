import { Injectable } from '@angular/core';
import { Egresado } from '../interfaces/egresado.interface';
import { SHA1 } from 'crypto-js';
import { environment } from 'src/environments/environment';

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

  getProfilePicFormData(image: any, egresadoId: number) {
    const formData = new FormData();
    const timestamp = new Date().getTime();
    const eager = environment.cloudinary.eager;
    const public_id = `egresado-id-${egresadoId}`;
    const api_secret = environment.cloudinary.api_secret;
    const file = this.DataURIToBlob(image.dataUrl);

    formData.append("file", file);
    formData.append("cloud_name", environment.cloudinary.cloud_name);
    formData.append("public_id", public_id);
    formData.append("api_key", environment.cloudinary.api_key);
    formData.append("folder", environment.cloudinary.profilePic_folter);
    formData.append("timestamp", `${timestamp}`);
    formData.append("eager", eager);
    formData.append("upload_preset", "ml_default");

    const serielizedSignature = `eager=${eager}&folder=egresados-uasd/profilePics&public_id=${public_id}&timestamp=${timestamp}&upload_preset=ml_default`;
    const signature = SHA1(serielizedSignature + api_secret);

    formData.append("signature", `${signature}`);

  return formData;
}

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }
  getAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) { age--; }
    return age;
  }
}