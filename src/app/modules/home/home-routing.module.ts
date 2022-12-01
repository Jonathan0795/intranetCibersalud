import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { UserGuard } from "src/app/core/guards/user.guard";
import { BusquedaUsuarioComponent } from "./component/busqueda-usuario/busqueda-usuario.component";
import { DashboardInfoComponent } from "./component/dashboard-info/dashboard-info.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { ForbiddenComponent } from "./component/forbidden/forbidden.component";
import { FormularioProductoComponent } from "./component/formulario-producto/formulario-producto.component";
import { ListaProductoComponent } from "./component/lista-producto/lista-producto.component";
import { LoginComponent } from "./component/login/login.component";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },

    {
        path: '',
        component: DashboardComponent,
        canActivate:[AuthGuard],
        data: { expectedRol: ['admin'] },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardInfoComponent
            },
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
            },
            {
                path: 'busqueda-usuario',
                component: BusquedaUsuarioComponent
            }
            ,]
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent,
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }