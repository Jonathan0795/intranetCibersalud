import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Categoria, Laboratorio, Producto } from 'src/app/shared/models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss']
})
export class FormularioProductoComponent implements OnInit {
  categoria?: Categoria[];
  laboratorio?: Laboratorio[];
  producto?: Producto;
  formulario?: FormGroup;
  errors: any;

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
            tipopresentacion: [producto.tipopresentacion, []],
            categorias: [producto.categorias.idcategorias, []],
            laboratorio: [producto.laboratorio.idlaboratorio, []],
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
        urlproducto: [, [Validators.required]],
        tipopresentacion: [, [Validators.required]],
        categorias: [, []],
        laboratorio: [, []],
      })
    }

    this.listCategory();
    this.listLaboratory();


  }

  fire() {
    Swal.fire({
      title: '¿Seguro de salir sin guardar cambios?',
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      icon: 'warning',
      denyButtonText: `No guardar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        this.router.navigate(['/lista-producto']);
      }
    })
  }
  controlError(control: string, error: string) {
    return this.formulario?.controls[control].hasError(error);

  }

  listCategory() {
    this.productoService.findAllCategoryNieto()
      .subscribe(categoria => {
        this.categoria = categoria;
      })
  }
  listLaboratory() {
    this.productoService.finLaboratory()
      .subscribe(laboratorio => {
        this.laboratorio = laboratorio;
      })
  }
  guardar() {
    if (this.formulario?.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const producto = this.formulario?.value;
    let request;

    if (this.producto) {
      request = this.productoService.updateProduct(this.producto.idproducto, producto);

    } else {
      request = this.productoService.saveProduct(producto)
    }
    request.subscribe({
      next: producto => {
        Swal.fire(
          '',
          `${producto.nombre} se guardó correctamente`,
          'success'
        )
        setTimeout(() => {
          this.router.navigate(['/lista-producto'])
          // console.log("guardando..", producto)
        }, 2500);
      },
      error: error => {
        this.errors = error.error.errors;

      }
    })
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

  subirImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formdata = new FormData();
      formdata.append('file', file);
      this.productoService.subirArchivo(formdata)
        .subscribe((response: any) => {
          //console.log('response',response)
          this.formulario?.controls['urlproducto'].setValue(response.filename)
        })
    }
  }
}
