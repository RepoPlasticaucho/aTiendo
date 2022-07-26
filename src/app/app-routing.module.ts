import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GruposCreateComponent } from './components/groups/grupos-create/grupos-create.component';
import { GruposEditComponent } from './components/groups/grupos-edit/grupos-edit.component';
import { GruposComponent } from './components/groups/grupos/grupos.component';

const routes: Routes = [
  { path: "grupos", component: GruposComponent },
  { path: "editarGrupos", component: GruposEditComponent },
  { path: "crearGrupos", component: GruposCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
