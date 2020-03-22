import { UsuarioInterface } from './usuario.interface';

export interface Auth0UsuarioInterface {
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
  updated_at?: string;
  user_id?: string;
  nickname?: string;
  created_at?: Date;
  last_login?: Date;
  logins_count?: number;
  usuario?: UsuarioInterface | number;
}
