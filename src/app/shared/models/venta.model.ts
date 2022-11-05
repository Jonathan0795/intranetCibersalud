import { Producto } from './producto.model';

export interface Venta {
    id: number;
    fecha: Date;
    total: number;
    estado: string;
    cliente: null;
    items: Item[];
}
export interface Item {
    id: number;
    precionormal: number;
    cantidad: number;
    producto: Producto;
}