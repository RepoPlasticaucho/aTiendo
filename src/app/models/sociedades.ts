export interface Sociedades {
    codigoError: string;
    descripcionError: string;
    lstSociedades: SociedadesEntity[];
}

export interface SociedadesEntity {
    idSociedad: string;
    idGrupo: string;
    nombreGrupo: string;
    idRol: string;
    nombreRol: string;
    razon_social: string;
    nombre_comercial: string;
    id_fiscal: string;
    password: string;
    email: string;
    telefono: string;
    gven: string;
    tipologia: string;
    cod_sap: string;
}