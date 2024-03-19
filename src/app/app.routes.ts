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
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserComponent } from './components/user/user.component';

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

  { path: 'jogos', component: JogoListComponent, title: 'Lista de Jogos' },
  { path: 'jogos/new', component: JogoFormComponent, title: 'Novo Jogo' },
  {
    path: 'jogos/edit/:id',
    component: JogoFormComponent,
    resolve: { jogo: jogoResolver },
  },

  { path: 'home', component: HomeComponent, title: 'Home' },

  { path: 'toolbar', component: ToolbarComponent, title: 'Toolbar' },

  { path: 'auth', component: UserComponent, title: 'Auth' },
];
