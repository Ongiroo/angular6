import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

    constructor(private _http: HttpClient) { }

    upload(vehicleId, photo) {
      let formData = new FormData();
      formData.append('file', photo);
      return this._http.post(`/api/vehicles/${vehicleId}/photos`, formData)
      .pipe(map((res: Response) => res));
    }

    getPhotos(vehicleId): Observable<any[]> {
      return this._http.get<any[]>(`/api/vehicles/${vehicleId}/photos`)
          .pipe(map((res: Response) => res));
    }
}
