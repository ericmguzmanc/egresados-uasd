import { NivelCarrera } from './interfaces/carrera.interface';

export const TIPO_CONTACTO = {
  CELULAR: "CELULAR",
  TRABAJO: "TRABAJO",
  EMAIL: "EMAIL",
}

export const LOADING_TIMEOUT = 0; 

export const EXPCOOKIE = 30

export const ABOUT_TEXTAREA_LENGTH = 500

export const TIPO_TITULO = [
  {
    nivel: NivelCarrera.Tecnico
  },
  {
    nivel: NivelCarrera.Especializacion
  },
  {
    nivel: NivelCarrera.Certificado
  },
  {
    nivel: NivelCarrera.TecnicoSuperior
  },
  {
    nivel: NivelCarrera.Licenciatura,
  },
  {
    nivel: NivelCarrera.Ingenieria
  },
  {
    nivel: NivelCarrera.Maestria
  },
  {
    nivel: NivelCarrera.Doctorado
  },
];

export enum ROLES {
  EGRESADO = "EGRESADO",
  ADMINISTRADOR = "ADMINISTRADOR"
}

export const APP_ROUTES = {
  tabs: {
    destacados: '/tabs/destacados',
    candidatos: '/tabs/candidatos-destacados'
  }
}
