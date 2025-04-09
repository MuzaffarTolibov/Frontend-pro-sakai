import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    refreshedToken$: Subject<boolean> = new Subject<boolean>();

    private _access_token: string;
    private _refresh_token: string;

    get access_token():string {
        if (!this._access_token) {
            this._access_token = localStorage.getItem('access_token');
        }
        return this._access_token;
    }

    get refresh_token():string {
        if (!this._refresh_token) {
            this._refresh_token = localStorage.getItem('refresh_token');
        }
        return this._refresh_token;
    }

    setTokens(meta: any) {
        this._access_token = meta.access_token;
        this._refresh_token = meta.refresh_token;
        localStorage.setItem('access_token', this._access_token);
        localStorage.setItem('refresh_token', this._refresh_token);
        this.refreshedToken$.next(true);
    }

    clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this._access_token = null;
        this._refresh_token = null;
    }
}
