export interface Usuario {
  id: number;
  email: string;
  password: string;
  username: string;
  egresadoId: number;
  roleId: number;
  rolUsuario: RolUsuario[]
}

export interface RolUsuario {
  usuarioId: number;
  roleId: number;
  rol: string;
}