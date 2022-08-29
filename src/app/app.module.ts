import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GruposComponent } from './components/groups/grupos/grupos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { GruposEditComponent } from './components/groups/grupos-edit/grupos-edit.component';
import { GruposCreateComponent } from './components/groups/grupos-create/grupos-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardClComponent } from './components/dashboard-cl/dashboard-cl.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NavegationClComponent } from './components/navegation-cl/navegation-cl.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavegationAdmComponent } from './components/navegation-adm/navegation-adm.component';
import { DashboardAdmComponent } from './components/dashboard-adm/dashboard-adm.component';
import { SociedadesComponent } from './components/corporations/sociedades/sociedades.component';
import { SociedadesCreateComponent } from './components/corporations/sociedades-create/sociedades-create.component';
import { SociedadesEditComponent } from './components/corporations/sociedades-edit/sociedades-edit.component';
import { AlmacenesCreateComponent } from './components/warehouses/almacenes-create/almacenes-create.component';
import { AlmacenesComponent } from './components/warehouses/almacenes/almacenes.component';
import { AlmacenesEditComponent } from './components/warehouses/almacenes-edit/almacenes-edit.component';
import { AlmacenessociedadComponent } from './components/warehouses/almacenessociedad/almacenessociedad.component';
import { AlmacenessociedadCreateComponent } from './components/warehouses/almacenessociedad-create/almacenessociedad-create.component';
import { AlmacenessociedadEditComponent } from './components/warehouses/almacenessociedad-edit/almacenessociedad-edit.component';
import { CategoriasComponent } from './components/categories/categorias/categorias.component';
import { CategoriasCreateComponent } from './components/categories/categorias-create/categorias-create.component';
import { CategoriasEditComponent } from './components/categories/categorias-edit/categorias-edit.component';
import { LineasComponent } from './components/lines/lineas/lineas.component';
import { LineasCreateComponent } from './components/lines/lineas-create/lineas-create.component';
import { LineasEditComponent } from './components/lines/lineas-edit/lineas-edit.component';
import { ModelosComponent } from './components/models/modelos/modelos.component';
import { ModelosCreateComponent } from './components/models/modelos-create/modelos-create.component';
import { ModelosEditComponent } from './components/models/modelos-edit/modelos-edit.component';
import { MarcasComponent } from './components/marks/marcas/marcas.component';
import { MarcasCreateComponent } from './components/marks/marcas-create/marcas-create.component';
import { MarcasEditComponent } from './components/marks/marcas-edit/marcas-edit.component';
import { ColorsComponent } from './components/colors/colors/colors.component';
import { ColorsCreateComponent } from './components/colors/colors-create/colors-create.component';
import { ColorsEditComponent } from './components/colors/colors-edit/colors-edit.component';
import { AtributosComponent } from './components/attributes/atributos/atributos.component';
import { AtributosCreateComponent } from './components/attributes/atributos-create/atributos-create.component';
import { AtributosEditComponent } from './components/attributes/atributos-edit/atributos-edit.component';
import { GenerosComponent } from './components/genres/generos/generos.component';
import { GenerosCreateComponent } from './components/genres/generos-create/generos-create.component';
import { GenerosEditComponent } from './components/genres/generos-edit/generos-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    GruposComponent,
    GruposEditComponent,
    GruposCreateComponent,
    DashboardClComponent,
    NavegationClComponent,
    NavegationAdmComponent,
    DashboardAdmComponent,
    SociedadesComponent,
    SociedadesCreateComponent,
    SociedadesEditComponent,
    AlmacenesCreateComponent,
    AlmacenesComponent,
    AlmacenesEditComponent,
    AlmacenessociedadComponent,
    AlmacenessociedadCreateComponent,
    AlmacenessociedadEditComponent,
    CategoriasComponent,
    CategoriasCreateComponent,
    CategoriasEditComponent,
    LineasComponent,
    LineasCreateComponent,
    LineasEditComponent,
    ModelosComponent,
    ModelosCreateComponent,
    ModelosEditComponent,
    MarcasComponent,
    MarcasCreateComponent,
    MarcasEditComponent,
    ColorsComponent,
    ColorsCreateComponent,
    ColorsEditComponent,
    AtributosComponent,
    AtributosCreateComponent,
    AtributosEditComponent,
    GenerosComponent,
    GenerosCreateComponent,
    GenerosEditComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
