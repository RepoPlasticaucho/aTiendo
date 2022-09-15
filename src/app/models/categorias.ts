export interface Categorias {
    codigoError: string;
    descripcionError: string;
    lstCategorias: CategoriasEntity[];
}

export interface CategoriasEntity {
    id?: string;
    categoria: string;
    cod_sap: string;
    etiquetas: string;
    almacen_id : string;
}