export interface DatosUsuarioPedidoInterface {
  usuario: DatosUsuarioStripeInterface;
  precio: number;
}
interface DatosUsuarioStripeInterface {
  name: string; // auth
  address?: string;
  email?: string;
}
