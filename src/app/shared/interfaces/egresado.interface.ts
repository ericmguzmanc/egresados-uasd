

export interface Egresado {
  id?: number;
  PrimerNombre?: string;
  SegundoNombre?: string;
  PrimerApellido?: string;
  SegundoApellido?: string;
  Cedula?: string;
  Pasaporte?: string;
  Genero?: string;
  FechaNac?: string;
  profilePicUrl?: string;
  about?: string;
  destacado?: boolean;
  descripcionDestacado?: string;
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
  // Direccion
  direccionEgresado?: DireccionEgresado[];
} 

export interface ExperienciaLaboral {
  id?: number,
  egresadoId?: number;
  empresa?: string;
  posicion?: string;
  salario?: number;
  FechaEntr?: string;
  FechaSal?: string;
}

export interface Posicion {
  id: number;
  posicion: string;
}

export interface Educacion {
  id?: number,
  egresadoId: number,
  Universidad?: string,
  FechaEntr?: string,
  FechaSal?: string,
  Titulo?: string,
  TipoTitulo?: string
}

export interface Titulo {
  id?: number;
  nombreTitulo?: string;
  tipo?: string;
}

export interface Nacionalidad {
  id?: number;
  egresadoId?: number;
  nacionalidadId?: number;
  nacionalidad?: string;
}

export interface Idioma {
  id?: number;
  egresadoId?: number;
  idioma?: string;
  idiomaId?: number;
  checked?: boolean;
}

export interface Contacto {
  id?: number;
  egresadoId?: number;
  tipo?: string;
  valor?: string;
} 

export interface EgresadosHabilidad {
  id?: number;
  egresadoId?: number;
  habilidadId?: number;
  habilidad?: string;
  checked?: boolean;
}

export interface DireccionEgresado {
  id?: number;
  egresadoId?: number;
  provincia?: string;
  provinciaId?: number;
}

