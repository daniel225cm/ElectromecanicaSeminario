export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  password?: string;
  rol: string;
}

export interface LoginResponse {
  access_token: string;
  usuario: Usuario;
}
