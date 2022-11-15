import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Categoria, Producto, ProductoPage } from 'src/app/shared/models/producto.model';

@Component({
  selector: 'app-dashboard-info',
  templateUrl: './dashboard-info.component.html',
  styleUrls: ['./dashboard-info.component.scss']
})
export class DashboardInfoComponent implements OnInit {
  displayedColumns: string[] = ['imagen', 'nombre'];
  productos?: Producto[]
  categorias?: Categoria[]

  productosLimit: Producto[] = [];
  productoPage?: ProductoPage;
  page = 0;
  last = false
  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.listaProductos();
    this.listaCategorias();
    this.getProducto();
  }
  getProducto() {
    this.productoService.getProductoLimit()
      .subscribe(productoPage => {
        this.productoPage = productoPage;
      })
  }
  listaProductos() {
    this.productoService.findAllProduct()
      .subscribe(productos => {
        this.productos = productos;
      })
  }
  listaCategorias() {
    this.productoService.findAllCategory()
      .subscribe(categorias => {
        this.categorias = categorias;
      })
  }
  paginarProducto(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.productoService.getProductoLimit(size, page)
      .subscribe(productoPage => {
        this.productoPage = productoPage;
      })
  }

}
