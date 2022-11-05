import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Producto } from 'src/app/shared/models/producto.model';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss']
})
export class FormularioProductoComponent implements OnInit {

  producto?: Producto;
  formulario?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productoService: ProductoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idProducto = this.route.snapshot.paramMap.get('idproducto');
    if (idProducto) {
      this.productoService.findByIdProduct(parseInt(idProducto))
        .subscribe(producto => {
          this.producto = producto;
          this.formulario = this.fb.group({
            nombre: [producto.nombre, [Validators.required]],
            nombreruta: [producto.nombreruta, [Validators.required]],
            registrosanitario: [producto.registrosanitario, []],
            descripcionlarga: [producto.descripcionlarga, []],
            descripcioncorta: [producto.descripcioncorta, []],
            contraindicaciones: [producto.contraindicaciones, []],
            precaucion: [producto.precaucion, []],
            composicion: [producto.composicion, []],
            modouso: [producto.modouso, []],
            stock: [producto.stock, [Validators.required]],
            precionormal: [producto.precionormal, [Validators.required]],
            preciorebajado: [producto.preciorebajado, []],
            urlproducto: [producto.urlproducto, []],
          })
        })
    } else {
      this.formulario = this.fb.group({
        nombre: [, [Validators.required]],
        nombreruta: [, [Validators.required]],
        registrosanitario: [, []],
        precionormal: [, [Validators.required]],
        preciorebajado: [, []],
        stock: [, [Validators.required]],
        descripcioncorta: [, []],
        descripcionlarga: [, []],
        composicion: [, []],
        contraindicaciones: [, []],
        precaucion: [, []],
        modouso: [, []],
        urlproducto: [, []],
      })
    }
  }
  controlError(control: string, error: string) {
    return this.formulario?.controls[control].hasError(error);

  }



  guardar() {

  }

  crearRuta() {
    const ruta = this.formulario?.controls['nombre'].value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
    this.formulario?.controls['nombreruta'].setValue(ruta);
  }
}
