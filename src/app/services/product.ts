import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Product } from '../models/product.ts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7172/api/Product';

  constructor(private http: HttpClient) {}

  getProducts(filters?: { name?: string; brandId?: number; hasImage?: boolean }): Observable<ApiResponse<Product[]>> {
    let params = new HttpParams();

    if (filters) {
      if (filters.name) params = params.set('name', filters.name);
      if (filters.brandId) params = params.set('brandId', filters.brandId);
      if (filters.hasImage !== undefined) params = params.set('hasImage', filters.hasImage.toString());
    }

    return this.http.get<ApiResponse<Product[]>>(this.apiUrl, { params });
  }
}

