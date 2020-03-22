export interface CargaMasivaInterface {
  nombre?: string;
  fechaInicio?: string;
  fechaFinalizacion?: string;
  horaInicio?: string;
  horaFin?: string;
  descripcion?: string;
  estado?: string;
}

export interface DatosEnviarInterface {
  idEmpresa: number;
  idEdificio: number;
  idBodega: number;
}
