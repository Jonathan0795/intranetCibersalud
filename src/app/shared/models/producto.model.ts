export interface ProductoPage {
    content:          Producto[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Producto {
    idproducto:         number;
    laboratorio:        Laboratorio;
    categorias:         Categoria;
    nombre:             string;
    nombreruta:         string;
    descripcionlarga:   string;
    descripcioncorta:   string;
    tipopresentacion:   string;
    precionormal:       number;
    preciorebajado:     number;
    urlproducto:        string;
    contraindicaciones: string;
    precaucion:         string;
    composicion:        string;
    modouso:            string;
    registrosanitario:  string;
    stock:              number;
    idestado:           number;
}

export interface Categoria {
    idcategorias:          number;
    idcategoriapadre:      number;
    desccategoria:         string;
    desccategoriabusqueda: string;
    jerarquia:             number;
    idestado:              number;
    categoriaPadre:        null;
    categoriaHijos:        null;
    productos:             null;
}

export interface Laboratorio {
    idlaboratorio:    number;
    laboratoriopadre: Laboratorio | null;
    deslaboratorio:   string;
    infolaboratorio:  null;
    imagenmarca:      null;
    idestado:         number;
    laboratorioHijos: null;
    productos:        null;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
