import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {
    }

    get isAuthenticated(): boolean {
        return !!this.tokenService.access_token && !!this.tokenService.refresh_token;
    }

    login(data: any): Observable<any> {
        return this.http.post(`${environment.authApiUrl}/auth/login`, data)
    }
}
