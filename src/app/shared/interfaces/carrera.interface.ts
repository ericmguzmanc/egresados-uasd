export interface Carrera {
  id: number;
  NombreCarrera: string;
  facultad?: Facultad;
  Nivel: "Licenciatura" | "Ingeniería" | "Maestría" | "Doctorado" | "Técnico Superior";
}

interface Facultad {
  id?: number;
  nombre?: string;
}