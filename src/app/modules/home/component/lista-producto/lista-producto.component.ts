import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Producto, ProductoPage } from 'src/app/shared/models/producto.model';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  productoPage?: ProductoPage;
  product?: Producto;

  displayedColumns: string[] = ['nombre', 'precio', 'categoria', 'presentacion','acciones'];
  dataSource  = new MatTableDataSource(this.productoPage?.content);
  
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
      //this.dataSource = new MatTableDataSource(this.productoPage?.content);

    });
    
    //this.dataSource = new MatTableDataSource(this.productoPage?.content);
    //console.log(this.productoPage?.content);
    //console.log(this.dataSource);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    
    console.log(filterValue);
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
