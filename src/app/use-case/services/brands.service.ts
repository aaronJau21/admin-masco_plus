import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import {
  IActivateBrand,
  ICreateBrandRequest,
  ICreateBrandResponse,
  IGetBrands,
} from '../../domain/interface';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private http = inject(HttpClient);
  private api = environment.API_URL;

  createBrand(data: ICreateBrandRequest): Observable<ICreateBrandResponse> {
    const url = `${this.api}/marca`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<ICreateBrandResponse>(url, data, { headers });
  }

  getBrands(): Observable<IGetBrands> {
    const url = `${this.api}/marca`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<IGetBrands>(url, { headers });
  }

  activateBrand(activate: boolean, id: string): Observable<IActivateBrand> {
    const url = `${this.api}/marca/activate-brand/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch<IActivateBrand>(url, { activate }, { headers });
  }
}
