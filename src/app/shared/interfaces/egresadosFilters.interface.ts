import { Provincia } from './provincia.interface';

export interface egresadosFilters {
  destacados?: boolean;
  habilidades?: { id: number, habilidad: string }[];
  rangoFechaFin?: string;
  rangoFechaInicio?: string;
  provincias?: Provincia[];
  tituloTipos?: string[];
  dateRangeDisabled?: boolean;
  deshabilitados: boolean;
}
