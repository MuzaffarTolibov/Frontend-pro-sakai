import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProduct } from './model/product.model';

const BASE_URL = `${(environment as any).apiUrl}/products`;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
      return this.http.get<IProduct[]>(BASE_URL)
    }

    create(user: IProduct): Observable<IProduct> {
      return this.http.post<IProduct>(BASE_URL, user)
    }

    update(user: IProduct, id: number | string): Observable<IProduct> {
      return this.http.put<IProduct>(`${BASE_URL}/${id}`, user)
    }

    delete(id: string | number): Observable<IProduct> {
      return this.http.delete<IProduct>(`${BASE_URL}/${id}`)
    }
}
