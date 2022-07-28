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
    SociedadesCreateComponent
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
