export interface Usuario {
  id: number;
  email: string;
  password: string;
  username: string;
  egresadoId: number;
  token: string;
  rol: string;
}