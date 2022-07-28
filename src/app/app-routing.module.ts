import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GruposCreateComponent } from './components/groups/grupos-create/grupos-create.component';
import { GruposEditComponent } from './components/groups/grupos-edit/grupos-edit.component';
import { GruposComponent } from './components/groups/grupos/grupos.component';
import { NavegationAdmComponent } from './navegation-adm/navegation-adm.component';
import { NavegationClComponent } from './navegation-cl/navegation-cl.component';

const routes: Routes = [
  { path: "grupos", component: GruposComponent },
  { path: "editarGrupos", component: GruposEditComponent },
  { path: "crearGrupos", component: GruposCreateComponent },
  { path: 'navegation-cl', component: NavegationClComponent },
  { path: 'navegation-adm', component: NavegationAdmComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
