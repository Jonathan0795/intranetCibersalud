import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { FormularioProductoComponent } from "./component/formulario-producto/formulario-producto.component";
import { HeaderComponent } from "./component/header/header.component";
import { ListaProductoComponent } from "./component/lista-producto/lista-producto.component";
import { LoginComponent } from "./component/login/login.component";
import { NavbarComponent } from "./component/navbar/navbar.component";


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,    
    },

    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
        {
            path: 'lista-producto',
            component: ListaProductoComponent
        },
        {
            path: 'formulario-producto',
            component: FormularioProductoComponent
        } 
        ,
        {
            path: 'formulario-producto/:idproducto/editar',
            component: FormularioProductoComponent
        }      
        ,]  
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }