export interface Grupos {
    codigoError: string;
    grupo: string;
    lstGrupos: GruposEntity[];
}

export interface GruposEntity {
    id: string;
    grupo: string;
    idFiscal: string;
}