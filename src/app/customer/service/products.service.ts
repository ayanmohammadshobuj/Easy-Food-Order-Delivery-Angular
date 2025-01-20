// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatorProducts, Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private pageNo = 1;
  private perPage = 8;


  
  private paginateUrl = "http://localhost:3000/products";

  private apiUrl = 'http://localhost:3000/products';
  

  constructor(private http: HttpClient) {}

  

  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl);
  }

  getProducts(): Observable<PaginatorProducts> {
    let params = new HttpParams().set('_page',this.pageNo).set('_per_page',this.perPage);
    return this.http.get<PaginatorProducts>(this.paginateUrl,{params:params});
  }

  getProductById(id: number): Observable<Products> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Products>(url);
  }

  addProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(this.apiUrl, product);
  }

  updateProduct(product: Products): Observable<Products> {
    return this.http.put<Products>(`${this.apiUrl}/${product.productId}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { PaginatorProducts } from '../models/products';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private pageNo = 1;
//   private perPage = 6;

//   private paginateUrl = "http://localhost:3000/products";

//   constructor(private http: HttpClient) {}

//   // Get paginated products based on current page and items per page
//   getProducts(): Observable<PaginatorProducts> {
//     let params = new HttpParams().set('_page', this.pageNo).set('_limit', this.perPage);
//     return this.http.get<PaginatorProducts>(this.paginateUrl, { params: params });
//   }

//   // Method to update page number
//   setPage(page: number) {
//     this.pageNo = page;
//   }

//   // Method to increment page
//   nextPage() {
//     this.pageNo++;
//   }

//   // Method to decrement page
//   previousPage() {
//     if (this.pageNo > 1) {
//       this.pageNo--;
//     }
//   }

//   // Get current page number
//   getPageNo(): number {
//     return this.pageNo;
//   }
// }

