export interface Carrera {
  id: number;
  NombreCarrera: string;
  facultad?: Facultad;
  Nivel: NivelCarrera;
}

export enum NivelCarrera {
  Licenciatura = 'Licenciatura',
  Ingenieria = 'Ingeniería',
  Maestria = 'Maestría',
  Doctorado = 'Doctorado',
  TecnicoSuperior = 'Técnico Superior',
  Tecnico = 'Técnico',
  Especializacion = 'Especializacion',
  Certificado = 'Certificado'
}

interface Facultad {
  id?: number;
  nombre?: string;
}