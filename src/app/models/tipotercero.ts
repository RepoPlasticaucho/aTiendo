export interface Tipoterceros {
    codigoError: string;
    descripcionError: string;
    lstTipo_Tercero: TipotercerosEntity[];
}

export interface TipotercerosEntity {
    id : string;
    descripcion: string;
    codigo: string;
}