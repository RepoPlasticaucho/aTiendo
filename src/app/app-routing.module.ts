import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenesComponent, AlmacenesCreateComponent, AlmacenesEditComponent, AlmacenessociedadComponent, AlmacenessociedadCreateComponent, AlmacenessociedadEditComponent, AtributosComponent, AtributosCreateComponent, AtributosEditComponent, CategoriasComponent, CategoriasCreateComponent, CategoriasEditComponent, ColorsComponent, ColorsCreateComponent, ColorsEditComponent, DashboardAdmComponent, DashboardClComponent, GenerosComponent, GenerosCreateComponent, GenerosEditComponent, GruposComponent, GruposCreateComponent, GruposEditComponent, LineasComponent, LineasCreateComponent, LineasEditComponent, MarcasComponent, MarcasCreateComponent, MarcasEditComponent, ModelosComponent, ModelosCreateComponent, ModelosEditComponent, NavegationAdmComponent, NavegationClComponent, SociedadesComponent, SociedadesCreateComponent, SociedadesEditComponent } from './components/all_components';


const routes: Routes = [
  {
    path: 'navegation-cl', component: NavegationClComponent,
    children: [
      { path: "", component: DashboardClComponent, outlet: "contentClient" },
      { path: "almacenes", component: AlmacenessociedadComponent, outlet: "contentClient" },
      { path: "crearAlmacenes", component: AlmacenessociedadCreateComponent, outlet: "contentClient" },
      { path: "editarAlmacenes", component: AlmacenessociedadEditComponent, outlet: "contentClient" },
      { path: "editarAlmacenes", component: AlmacenessociedadEditComponent, outlet: "contentClient" },
      { path: "editarAlmacenes", component: AlmacenessociedadEditComponent, outlet: "contentClient" }


    ]
  },
  {
    path: 'navegation-adm', component: NavegationAdmComponent,
    children: [
      { path: "", component: DashboardAdmComponent, outlet: "contentAdmin" },
      { path: "almacenes", component: AlmacenesComponent, outlet: "contentAdmin" },
      { path: "crearAlmacenes", component: AlmacenesCreateComponent, outlet: "contentAdmin" },
      { path: "editarAlmacenes", component: AlmacenesEditComponent, outlet: "contentAdmin" },
      { path: "grupos", component: GruposComponent, outlet: "contentAdmin" },
      { path: "editarGrupos", component: GruposEditComponent, outlet: "contentAdmin" },
      { path: "crearGrupos", component: GruposCreateComponent, outlet: "contentAdmin" },
      { path: "sociedades", component: SociedadesComponent, outlet: "contentAdmin" },
      { path: "crearSociedades", component: SociedadesCreateComponent, outlet: "contentAdmin" },
      { path: "editarSociedades", component: SociedadesEditComponent, outlet: "contentAdmin" },
      { path: "categorias", component: CategoriasComponent, outlet: "contentAdmin" },
      { path: "crearCategorias", component: CategoriasCreateComponent, outlet: "contentAdmin" },
      { path: "editarCategorias", component: CategoriasEditComponent, outlet: "contentAdmin" },
      { path: "lineas", component: LineasComponent, outlet: "contentAdmin" },
      { path: "crearLineas", component: LineasCreateComponent, outlet: "contentAdmin" },
      { path: "editarLineas", component: LineasEditComponent, outlet: "contentAdmin" },
      { path: "modelos", component: ModelosComponent, outlet: "contentAdmin" },
      { path: "crearModelos", component: ModelosCreateComponent, outlet: "contentAdmin" },
      { path: "editarModelos", component: ModelosEditComponent, outlet: "contentAdmin" },
      { path: "marcas", component: MarcasComponent, outlet: "contentAdmin" },
      { path: "crearMarcas", component: MarcasCreateComponent, outlet: "contentAdmin" },
      { path: "editarMarcas", component: MarcasEditComponent, outlet: "contentAdmin" },
      { path: "colores", component: ColorsComponent, outlet: "contentAdmin" },
      { path: "crearColores", component: ColorsCreateComponent, outlet: "contentAdmin" },
      { path: "editarColores", component: ColorsEditComponent, outlet: "contentAdmin" },
      { path: "atributos", component: AtributosComponent, outlet: "contentAdmin" },
      { path: "crearAtributos", component: AtributosCreateComponent, outlet: "contentAdmin" },
      { path: "editarAtributos", component: AtributosEditComponent, outlet: "contentAdmin" },
      { path: "generos", component: GenerosComponent, outlet: "contentAdmin" },
      { path: "crearGeneros", component: GenerosCreateComponent, outlet: "contentAdmin" },
      { path: "editarGeneros", component: GenerosEditComponent, outlet: "contentAdmin" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
