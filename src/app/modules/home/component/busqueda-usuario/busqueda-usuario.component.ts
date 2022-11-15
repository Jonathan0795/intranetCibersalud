import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/core/services/producto.service';

@Component({
  selector: 'app-busqueda-usuario',
  templateUrl: './busqueda-usuario.component.html',
  styleUrls: ['./busqueda-usuario.component.scss']
})
export class BusquedaUsuarioComponent implements OnInit {

  formulario: FormGroup = this.fb.group({
    documento: [, [Validators.pattern('[0-9 ]{1,9}'), Validators.required]],

  })
  constructor(
    private fb: FormBuilder,
    private productoService:ProductoService,
  ) { }

  ngOnInit(): void {
  }
  controlError(control: string, error: string) {
    return this.formulario.controls[control].hasError(error);

  }

  buscar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
  }
}
