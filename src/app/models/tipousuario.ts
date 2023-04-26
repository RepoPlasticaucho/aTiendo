export interface Tipousuarios {
    codigoError: string;
    descripcionError: string;
    lstTipo_Usuario: TipousuariosEntity[];
}

export interface TipousuariosEntity {
    id? : string;
    usuario?: string;
}