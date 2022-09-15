export interface Inventarios {
    id: string | undefined;
    lstModelo_Productos: import("../models/modeloproductos").ModeloProductosEntity[];
    lstModelos: import("../models/modelos").ModelosEntity[];
    lstLineas: import("../models/lineas").LineasEntity[];
    lstCategorias: import("../models/categorias").CategoriasEntity[];
    codigoError: string;
    descripcionError: string;
    lstInventarios: InventariosEntity[];
}

export interface InventariosEntity {
        categoria_id : string;
        categoria : string;
        linea_id? : string;
        linea : string;
        modelo_id? : string;
        modelo :string;
        marca_id : string;
        marca : string;
        modelo_producto_id : string;
        idProducto : string;
        Producto : string;
        id : string;
        dInventario : string;
        producto_id : string;
        almacen_id : string;
        almacen : string;
        stock : string;
        stock_optimo : string;
        fav : string;
        color :string;
    
}