import {DiapositivaInterface} from '../../interfaces/diapositiva.interface';

export class Diapositiva {
  constructor(
    public titulo?: string,
    public notas?: string,
    public segundoEmpieza?: string,
    public duracion?: string,
    public siguienteDiapositiva?: DiapositivaInterface | number | string | any,
    public anteriorDiapositiva?: DiapositivaInterface | number | string | any,

) {
}
}

