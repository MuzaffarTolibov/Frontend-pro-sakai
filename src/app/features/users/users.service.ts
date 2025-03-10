import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './model/user.model';
import { environment } from '../../../environments/environment';

const BASE_URL = `${(environment as any).apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

    getUsers(): Observable<IUser[]> {
      return this.http.get<IUser[]>(BASE_URL) // user list
    }

    createUser(user: IUser): Observable<IUser> {
      return this.http.post<IUser>(BASE_URL, user)
    }

    update(user: IUser, id: number | string): Observable<IUser> {
      return this.http.put<IUser>(`${BASE_URL}/${id}`, user)
    }

    delete(id: string | number): Observable<IUser> {
      return this.http.delete<IUser>(`${BASE_URL}/${id}`)
    }
}
