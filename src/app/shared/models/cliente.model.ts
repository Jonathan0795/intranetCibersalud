export interface Cliente {
    idcliente: number;
    apellidopat: string;
    apellidomat: string;
    nombre: string;
    iddoc: number;
    documento: string;
    fechnac: Date;
    username: string;
    password: string;
    direccion: string;
    idubigeo: string;
    celular: string;
}

export interface Newsletter{
    idnewsletter:number;
    correonewsletter:string;
}
/*
export interface UsuarioRol{
    usuario_id:Cliente;
    rol_id:Rol;
}*/