import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Brand } from '../models/brand.ts';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'https://localhost:7172/api/Brand';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<ApiResponse<Brand[]>> {
    return this.http.get<ApiResponse<Brand[]>>(this.apiUrl);
  }
}

