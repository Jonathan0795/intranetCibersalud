import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto, Categoria, ProductoPage, Laboratorio } from '../../shared/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient
  ) { }

  findAllCategory(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${environment.apiBase}/categoria/listar`)  // ALT GR + }
  }

  findAllProduct(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.apiBase}/producto/listar`)
  }

  findByCategoria(idCategoria: number) {
    return this.http.get<Producto[]>(`${environment.apiBase}/categoria/${idCategoria}`)
  }

  findByIdProduct(idproducto: number):Observable<Producto> {
    return this.http.get<Producto>(`${environment.apiBase}/producto/editar/${idproducto}`)
  }

  updateProduct(idproducto: number,producto: Producto):Observable<Producto> {
    return this.http.put<Producto>(`${environment.apiBase}/producto/${idproducto}`,producto)
  }
  saveProduct(producto: Producto):Observable<Producto> {
    return this.http.post<Producto>(`${environment.apiBase}/producto`, producto)
}
  getProducto(size: number = 10, page: number = 0) {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    params = params.append('sort', 'idproducto,desc');
    return this.http.get<ProductoPage>(`${environment.apiBase}/producto`, { params })
  }

  subirArchivo(formdata: FormData) {
    return this.http.post(`${environment.apiBase}/producto/assets/upload`, formdata);
  }

  findAllCategoryNieto(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${environment.apiBase}/producto/categorias`)  // ALT GR + }
  }

  finLaboratory(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(`${environment.apiBase}/producto/laboratorios`)  // ALT GR + }
  }
}
