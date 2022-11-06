import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule }   from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormularioProductoComponent } from './component/formulario-producto/formulario-producto.component';
import { ListaProductoComponent } from './component/lista-producto/lista-producto.component';
import { MaterialModule } from '../material/material.module';
import { ApiImgPipe } from 'src/app/shared/pipes/api-img.pipe';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    FormularioProductoComponent,
    ListaProductoComponent,
    ApiImgPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxImageZoomModule
  ]
})
export class HomeModule { }
