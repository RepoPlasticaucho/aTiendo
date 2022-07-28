import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SociedadesCreateComponent } from './components/corporations/sociedades-create/sociedades-create.component';
import { SociedadesComponent } from './components/corporations/sociedades/sociedades.component';
import { GruposCreateComponent } from './components/groups/grupos-create/grupos-create.component';
import { GruposEditComponent } from './components/groups/grupos-edit/grupos-edit.component';
import { GruposComponent } from './components/groups/grupos/grupos.component';
import { NavegationAdmComponent } from './components/navegation-adm/navegation-adm.component';
import { NavegationClComponent } from './components/navegation-cl/navegation-cl.component';

const routes: Routes = [
  { path: "grupos", component: GruposComponent },
  { path: "editarGrupos", component: GruposEditComponent },
  { path: "crearGrupos", component: GruposCreateComponent },
  { path: 'navegation-cl', component: NavegationClComponent },
  { path: 'navegation-adm', component: NavegationAdmComponent },
  { path: "sociedades", component: SociedadesComponent },
  { path: "crearSociedades", component: SociedadesCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
