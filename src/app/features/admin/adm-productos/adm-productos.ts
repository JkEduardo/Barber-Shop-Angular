import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product';
import { Product } from '../../../models/product.ts';
import { BrandService } from '../../../services/brand';
import { Brand } from '../../../models/brand.ts';

import { Loading } from '../../../shared/components/loading/loading';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adm-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, Loading],
  templateUrl: './adm-productos.html',
  styleUrls: ['./adm-productos.css']
})
export class AdmProductos implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  brands: Brand[] = [];
  loading = true;

  page = 1;
  pageSize = 10;

  filters: { name: string; brandId: number | 0; hasImage: '' | 'true' | 'false' } = {
    name: '',
    brandId: 0,
    hasImage: ''
  };

  constructor(
    private router: Router,
    private productService: ProductService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.search();
  }

  get paginatedProducts(): Product[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  get pages(): number[] {
  const total = this.totalPages;
  const maxVisible = 5; 
  const pages: number[] = [];

  let start = Math.max(1, this.page - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}

goToPage(p: number) {
  this.page = p;
}

previousPage() {
  if (this.page > 1) this.page--;
}

nextPage() {
  if (this.page < this.totalPages) this.page++;
}

get startRecord(): number {
  return (this.page - 1) * this.pageSize + 1;
}

get endRecord(): number {
  const end = this.page * this.pageSize;
  return end > this.filteredProducts.length ? this.filteredProducts.length : end;
}

  loadBrands() {
    this.brandService.getBrands().subscribe({
      next: (res) => (this.brands = res.list),
      error: () => (this.brands = [])
    });
  }
  filterProducts() {
  const text = this.filters.name.toLowerCase();
  this.filteredProducts = this.products.filter(p =>
    p.name.toLowerCase().includes(text)
  );
  this.page = 1;
}
search() {
  this.loading = true;

  const filters: any = {};

  if (this.filters.name?.trim()) {
    filters.name = this.filters.name.trim();
  }

  if (this.filters.brandId && this.filters.brandId !== 0) {
    filters.brandId = this.filters.brandId;
  }

  if (this.filters.hasImage !== '' && this.filters.hasImage !== undefined) {
    filters.hasImage = this.filters.hasImage === 'true';
  }

  this.productService.getProducts(filters).subscribe({
    next: (res) => {
      this.products = res.list;
      this.filteredProducts = [...this.products];
      this.page = 1;
      this.loading = false;
    },
    error: () => (this.loading = false)
  });
}



  getBrandName(brandId: number): string {
  const brand = this.brands.find(b => b.id === Number(brandId));
  return brand ? brand.name : '—';
}


  onNameInput() {
    this.search();
  }

  onBrandChange() {
    this.search();
  }

  onHasImageChange() {
    this.search();
  }

  goTo(path: string) {
    this.router.navigate([`/${path}`]); 
  }
}


