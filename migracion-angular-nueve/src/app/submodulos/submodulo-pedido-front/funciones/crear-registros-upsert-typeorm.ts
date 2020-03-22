import { EntitySchema, getConnection, ObjectType } from 'typeorm/browser';
import { ingresarRegistro } from './ingresar-registro';

export async function crearRegistrosUpsertTypeorm(
  entidad: ObjectType<any> | EntitySchema<any>,
  registros: any[],
  nombreConexion: string = 'default',
) {
  try {
    const connection = getConnection(nombreConexion);
    const conexionEntidad = connection
      .createQueryBuilder()
      .insert()
      .into(entidad);
    const arregloRespuesta = [];
    for (const registro of registros) {
      const empresaUpsert = await ingresarRegistro(
        conexionEntidad,
        registro,
      ).execute();
      arregloRespuesta.push(empresaUpsert);
    }
    return arregloRespuesta;
  } catch (e) {
    const error = {
      error: e,
      mensaje: 'Error ingresando registros',
    };
    console.error(error);
    return error;
  }
}
