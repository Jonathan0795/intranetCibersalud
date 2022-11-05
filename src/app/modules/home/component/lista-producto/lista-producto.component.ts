import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Producto, ProductoPage } from 'src/app/shared/models/producto.model';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'precio', 'categoria', 'presentacion','acciones'];

  productos: Producto[] = [];
  productoPage?: ProductoPage;
  product?: Producto;
  constructor(
    private productoservice: ProductoService,
  ) { }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto(){
    this.productoservice.getProducto()
    .subscribe(productoPage =>{
      this.productoPage = productoPage;
    })
  }
  applyFilter(event: Event) {
    /*
    const filterValue = (event.target as HTMLInputElement).value;
    this.productos.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }

  paginarProducto(event: PageEvent){
    const page = event.pageIndex;
    const size =event.pageSize;
    this.productoservice.getProducto(size,page)
    .subscribe(productoPage =>{
      this.productoPage = productoPage;
    })
  }
}
