export interface Tipo_terceros {
    codigoError: string;
    descripcionError: string;
    lstTipo_Terceros: Tipo_tercerosEntity[];
}

export interface Tipo_tercerosEntity {
    id : string;
    descripcion: string;
    codigo: string;
    created_at : string;
    update_at : string;
}