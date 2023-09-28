import { Contacto } from './contacto.interface';

export interface Egresado {
  id?: number;
  Nombre?: string;
  ApellidoPaterno?: string;
  ApellidoMaterno?: string;
  Cedula?: string;
  Pasaporte?: string;
  Genero?: string;
  FechaNac?: string;
  profilePicUrl?: string;
  // Nacionalidad
  nacionalidadEgresado?: Nacionalidad[];
  idiomaEgresado?: Idioma[];
  // ExperienciaLaboral
  experienciaLaboralEgresado?: ExperienciaLaboral[];
  // Educacion
  educacionEgresado?: Educacion[];
  // Contacto
  contacto?: Contacto[];
} 

export interface ExperienciaLaboral {
  EgresadoId?: number;
  posicion?: string;
  Salario?: number;
  FechaEntr?: string;
  FechaSal?: string;
}

export interface Posicion {
  id: number;
  posicion: string;
}

export interface Educacion {
  id: number,
  egresadoId: number,
  Universidad?: string,
  FechaEntr?: string,
  FechaSal?: string,
  Titulo?: string,
  TipoTitulo?: string
}

export interface Carrera {
  id?: number;
  NombreCarrera?: string;
  Nivel?: string;
}

export interface Titulo {
  id?: number;
  nombreTitulo?: string;
  tipo?: string;
}

export interface Nacionalidad {
  id?: number,
  egresadoId?: number,
  nacionalidadId?: number,
  nacionalidad?: string;
}

export interface Idioma {
  id: number,
  egresadoId?: number,
  idioma?: string;
}