import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { KeyValuePair, Vehicle } from '../models/vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly configUrl = "assets/config.json"; // URL to web api
  private readonly makesUrl = "api/makes";  // URL to web api
  private readonly featuresUrl = "/api/features";  // URL to web api
  private readonly vehiclesEndpoint = "/api/vehicles";

  constructor(private _http: HttpClient) { }

  getMakes() {
    return this._http.get('/api/makes')
      .pipe(map((res: Response) => res));
  }
  getMakeswithoutModel(): Observable<KeyValuePair[]>  {
    return this._http.get<KeyValuePair[]>('/api/makes')
        .pipe(map((res: Response) => res));
  }
  getFeatures() {
    return this._http.get('/api/features')
        .pipe(map(res => res));
  }

  create(vehicle): Observable<Vehicle> {
    console.log(vehicle);
    return this._http.post<Vehicle>(this.vehiclesEndpoint, vehicle)
      .pipe(map(res => res));
  }

  update(vehicle): Observable<Vehicle> {
    return this._http.put<Vehicle>(this.vehiclesEndpoint + "/" + vehicle.id, vehicle)
      .pipe(map(res => res));
  }

  getVehicle(id) {
    return this._http.get(this.vehiclesEndpoint + "/" + id)
      .pipe(map(res => res));
  }

  getVehicles(filter) {
    return this._http.get(this.vehiclesEndpoint + "?" + this.toQueryString(filter))
      .pipe(map(res => res));
  }

  toQueryString(obj) {
    let parts = [];
    for (let property in obj) {
      let value = obj[property];
      if (value != null && value != undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.join("&");
  }

  delete(id) {
    return this._http.delete(this.vehiclesEndpoint + "/" + id)
        .pipe(map(res => res));
  }
}



