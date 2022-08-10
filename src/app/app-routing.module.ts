import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SociedadesCreateComponent } from './components/corporations/sociedades-create/sociedades-create.component';
import { SociedadesEditComponent } from './components/corporations/sociedades-edit/sociedades-edit.component';
import { SociedadesComponent } from './components/corporations/sociedades/sociedades.component';
import { DashboardAdmComponent } from './components/dashboard-adm/dashboard-adm.component';
import { DashboardClComponent } from './components/dashboard-cl/dashboard-cl.component';
import { GruposCreateComponent } from './components/groups/grupos-create/grupos-create.component';
import { GruposEditComponent } from './components/groups/grupos-edit/grupos-edit.component';
import { GruposComponent } from './components/groups/grupos/grupos.component';
import { NavegationAdmComponent } from './components/navegation-adm/navegation-adm.component';
import { NavegationClComponent } from './components/navegation-cl/navegation-cl.component';
import { AlmacenesComponent } from './components/warehouses/almacenes/almacenes.component';
import { AlmacenessociedadComponent } from './components/warehouses/almacenessociedad/almacenessociedad.component';

const routes: Routes = [
  { path: 'navegation-cl', component: NavegationClComponent,
    children: [
    { path: "", component: DashboardClComponent, outlet: "contentClient" },
    { path: "almacenes", component: AlmacenessociedadComponent, outlet: "contentClient" }
    ]
  },
  {
    path: 'navegation-adm', component: NavegationAdmComponent,
    children: [
      { path: "", component: DashboardAdmComponent, outlet: "contentAdmin" },
      { path: "grupos", component: GruposComponent, outlet: "contentAdmin" },
      { path: "almacenes", component: AlmacenesComponent, outlet: "contentAdmin" },
      { path: "editarGrupos", component: GruposEditComponent, outlet: "contentAdmin" },
      { path: "crearGrupos", component: GruposCreateComponent, outlet: "contentAdmin" },
      { path: "sociedades", component: SociedadesComponent, outlet: "contentAdmin" },
      { path: "crearSociedades", component: SociedadesCreateComponent, outlet: "contentAdmin" },
      { path: "editarSociedades", component: SociedadesEditComponent, outlet: "contentAdmin" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
