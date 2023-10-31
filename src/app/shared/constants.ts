import { NivelCarrera } from './interfaces/carrera.interface';

export const TIPO_CONTACTO = {
  CELULAR: "CELULAR",
  TRABAJO: "TRABAJO",
  EMAIL: "EMAIL",
}

export const LOADING_TIMEOUT = 0; 

export const EXPCOOKIE = 30

export const ABOUTLENGHT = 500

export const TIPO_TITULO = [
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
  }
];

export enum ROLES {
  EGRESADO = "EGRESADO",
  ADMINISTRADOR = "ADMINISTRADOR"
}
