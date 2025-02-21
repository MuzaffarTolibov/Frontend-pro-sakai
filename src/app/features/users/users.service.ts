import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from './model/user.model';

const BASE_URL = `https://fakestoreapi.com/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

    getUsers(): Observable<IUser[]> {
      return this.http.get<IUser[]>(BASE_URL) // user list
    }
}
