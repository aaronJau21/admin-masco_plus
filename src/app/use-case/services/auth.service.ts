import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ILoginRequest, ILoginResponse, IUser } from '../../domain/interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.API_URL;

  public login(data: ILoginRequest): Observable<ILoginResponse> {
    const url = `${this.api}/auth/login`;

    return this.http.post<ILoginResponse>(url, data);
  }

  public saveLocal(token: string, user: IUser) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
