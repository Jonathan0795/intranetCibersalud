export interface Ubigeo {
    idubigeo:  string;
    provincia: Provincia;
    distrito:  string;
}

export interface Provincia {
    idprovincia:  string;
    departamento: Departamento;
    provincia:    string;
}

export interface Departamento {
    iddepartamento: string;
    departamento:   string;
}
