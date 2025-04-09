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

}
