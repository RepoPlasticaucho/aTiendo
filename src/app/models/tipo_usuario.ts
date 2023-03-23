export interface Tipo_usuarios {
    codigoError: string;
    descripcionError: string;
    lstTipo_Usuarios: Tipo_usuariosEntity[];
}

export interface Tipo_usuariosEntity {
    id : string;
    usuario: string;
    created_at : string;
    update_at : string;
}