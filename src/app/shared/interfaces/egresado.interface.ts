

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
  about?: string;
  // Nacionalidad
  nacionalidadEgresado?: Nacionalidad[];
  idiomaEgresado?: Idioma[];
  // ExperienciaLaboral
  experienciaLaboralEgresado?: ExperienciaLaboral[];
  // Educacion
  educacion?: Educacion[];
  // Contacto
  contacto?: Contacto[];
  // Habilidades
  egresadosHabilidad?: EgresadosHabilidad[];
} 

export interface ExperienciaLaboral {
  EgresadoId?: number;
  empresa?: string;
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

export interface Contacto {
  id: number,
  egresadoId?: number,
  tipo?: string;
  valor?: string;
} 

export interface EgresadosHabilidad {
  id?: number;
  egresadoId?: number;
  habilidadId?: number;
  habilidad?:string
}

