import { Routes } from '@angular/router';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { estadoResolver } from './components/estado/resolver/estado-resolver';
import { MunicipioListComponent } from './components/municipio/municipio-list/municipio-list.component';
import { MunicipioFormComponent } from './components/municipio/municipio-form/municipio-form.component';
import { municipioResolver } from './components/municipio/resolver/municipio-resolver';
import { JogoListComponent } from './components/jogo/jogo-list/jogo-list.component';
import { JogoFormComponent } from './components/jogo/jogo-form/jogo-form.component';
import { jogoResolver } from './components/jogo/resolver/jogo-resolver';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { RequisitoListComponent } from './components/requisitos/requisito-list/requisito-list.component';
import { RequisitoFormComponent } from './components/requisitos/requisito-form/requisito-form.component';
import { requisitoResolver } from './components/requisitos/resolver/requisito-resolver';
import { GeneroListComponent } from './components/genero/genero-list/genero-list.component';
import { GeneroFormComponent } from './components/genero/genero-form/genero-form.component';
import { generoResolver } from './components/genero/resolver/genero-resolver';
import { FabricanteListComponent } from './components/fabricante/fabricante-list/fabricante-list.component';
import { FabricanteFormComponent } from './components/fabricante/fabricante-form/fabricante-form.component';
import { fabricanteResolver } from './components/fabricante/resolver/fabricante-resolver';


export const routes: Routes = [
  {
    path: 'estados',
    component: EstadoListComponent,
    title: 'Lista de Estados',
  },
  { path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado' },
  {
    path: 'estados/edit/:id',
    component: EstadoFormComponent,
    resolve: { estado: estadoResolver },
  },

  {
    path: 'municipios',
    component: MunicipioListComponent,
    title: 'Lista de Municipios',
  },
  {
    path: 'municipios/new',
    component: MunicipioFormComponent,
    title: 'Novo Municipio',
  },
  {
    path: 'municipios/edit/:id',
    component: MunicipioFormComponent,
    resolve: { municipio: municipioResolver },
  },

  // Requisitos

  {
    path: 'requisitos',
    component: RequisitoListComponent,
    title: 'Lista de requisitos',
  },
  { path: 'requisitos/new', component: RequisitoFormComponent, title: 'Novos Requisitos' },
  {
    path: 'requisitos/edit/:id',
    component: RequisitoFormComponent,
    resolve: { requisito: requisitoResolver },
  },

  // genero
  {
    path: 'generos',
    component: GeneroListComponent,
    title: 'Lista de Generos',
  },
  { path: 'generos/new', component: GeneroFormComponent, title: 'Novo Genero' },
  {
    path: 'generos/edit/:id',
    component: GeneroFormComponent,
    resolve: { genero: generoResolver },
  },

  // Fabricante

  {
    path: 'fabricantes',
    component: FabricanteListComponent,
    title: 'Lista de Fabricantes',
  },
  { path: 'fabricantes/new', component: FabricanteFormComponent, title: 'Novo Fabricante' },
  {
    path: 'fabricantes/edit/:id',
    component: FabricanteFormComponent,
    resolve: { fabricante: fabricanteResolver },
  },

  // Jogos

  { path: 'jogos', component: JogoListComponent, title: 'Lista de Jogos' },
  { path: 'jogos/new', component: JogoFormComponent, title: 'Novo Jogo' },
  {
    path: 'jogos/edit/:id', component: JogoFormComponent, resolve: { jogo: jogoResolver },
  },

  { path: 'home', component: HomeComponent, title: 'Home' },

  { path: 'auth', component: LoginComponent, title: 'Auth' },

  { path: 'usuarios', component: UserListComponent, title: 'Usuários' },

  {
    path: 'usuarios/cadastro',
    component: UserFormComponent,
    title: 'Cadastro de Usuário',
  },
];
