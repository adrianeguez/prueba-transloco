import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationServices {
  private _coordenadas;

  async cargarCoordenadas() {
    this._coordenadas = await this.getPosition();
  }

  protected getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }

  public getCoordendas() {
    return this._coordenadas;
  }
}
