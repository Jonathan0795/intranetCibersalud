import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../auth-model/auth.model';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  roles: Array<string> = [];

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: Credentials) {
    return this.http.post(environment.loginUrl, credentials, {
      observe: 'response'
    })
      .pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;
        console.log('headers', headers);

        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer', '');
        const tokenData: any = jwtDecode(token);

        console.log('tokenData', tokenData);

        const expireAt = moment('1970-01-01').add(tokenData.exp, 'seconds')

        console.log('expireAt', expireAt, tokenData.exp);

        localStorage.setItem('Cibersalud_user_id', tokenData.userId);
        localStorage.setItem('Cibersalud_name', tokenData.name);
        localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(tokenData.authorities));
        localStorage.setItem('Cibersalud_token', tokenData.token);
        localStorage.setItem('Cibersalud_expires_at', JSON.stringify(expireAt.valueOf()));

        return body;
      }))
  }


  // jonathan00@gmail.com

  // rosasancho18@gmail.com

  public getAuthorities(): string[] {
    this.roles = [];
    if (localStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: string)=> {
        this.roles.push(authority);
      });
    }
    return this.roles;
  }

  get name() {
    return localStorage.getItem('Cibersalud_name') || '';
  }

  get token() {
    return localStorage.getItem('Cibersalud_token') || '';
  }

  isLoggedIn() {
    const expiration = localStorage.getItem('Cibersalud_expires_at');
    if (expiration) {
      return moment().isBefore(moment(JSON.parse(expiration)));
    }
    return false;
  }

  logout() {
    localStorage.removeItem('Cibersalud_user_id');
    localStorage.removeItem('Cibersalud_name');
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.removeItem('Cibersalud_token');
    localStorage.removeItem('Cibersalud_expires_at');
  }
}