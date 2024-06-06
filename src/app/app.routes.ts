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
import { userResolver } from './components/user/resolver/user-resolver';
import { RequisitoListComponent } from './components/requisitos/requisito-list/requisito-list.component';
import { RequisitoFormComponent } from './components/requisitos/requisito-form/requisito-form.component';
import { requisitoResolver } from './components/requisitos/resolver/requisito-resolver';
import { GeneroListComponent } from './components/genero/genero-list/genero-list.component';
import { GeneroFormComponent } from './components/genero/genero-form/genero-form.component';
import { generoResolver } from './components/genero/resolver/genero-resolver';
import { FabricanteListComponent } from './components/fabricante/fabricante-list/fabricante-list.component';
import { FabricanteFormComponent } from './components/fabricante/fabricante-form/fabricante-form.component';
import { fabricanteResolver } from './components/fabricante/resolver/fabricante-resolver';
import { PaisListComponent } from './components/pais/pais-list/pais-list.component';
import { PaisFormComponent } from './components/pais/pais-form/pais-form.component';
import { paisResolver } from './components/pais/resolver/pais-resolver';
import { DesenvolvedoraListComponent } from './components/desenvolvedora/desenvolvedora-list/desenvolvedora-list.component';
import { DesenvolvedoraFormComponent } from './components/desenvolvedora/desenvolvedora-form/desenvolvedora-form.component';
import { desenvolvedoraResolver } from './components/desenvolvedora/resolver/desenvolvedora-resolver';
import { PlataformaListComponent } from './components/plataforma/plataforma-list/plataforma-list.component';
import { PlataformaFormComponent } from './components/plataforma/plataforma-form/plataforma-form.component';
import { plataformaResolver } from './components/plataforma/resolver/plataforma-resolver';
import { cadastroResolver } from './components/cadastro-admin/cadastro-admin-form/resolver/cadastro-admin-resolver';
import { CadastroAdminFormComponent } from './components/cadastro-admin/cadastro-admin-form/cadastro-admin-form.component';
import { TelaAdministradorComponent } from './components/tela-administrador/tela-administrador.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { JogoCardListComponent } from './components/jogo-card-list/jogo-card-list.component';
export const routes: Routes = [
  

  {
    path: 'usuariologado/cadastro',
    component: CadastroAdminFormComponent,
    title: 'Cadastro de Usuário',
  },

  {
    path: 'usuariologado/edit/:id',
    component: CadastroAdminFormComponent,
    resolve: { user: cadastroResolver },
  },

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
  {
    path: 'requisitos/new',
    component: RequisitoFormComponent,
    title: 'Novos Requisitos',
  },
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
  {
    path: 'fabricante/cadastro',
    component: FabricanteFormComponent,
    title: 'Novo Fabricante',
  },
  {
    path: 'fabricante/edit/:id',
    component: FabricanteFormComponent,
    resolve: { fabricante: fabricanteResolver },
  },

  // Jogos

  { path: 'jogos', component: JogoListComponent, title: 'Lista de Jogos' },
  { path: 'jogos/new', component: JogoFormComponent, title: 'Novo Jogo' },
  {
    path: 'jogos/edit/:id',
    component: JogoFormComponent,
    resolve: { jogo: jogoResolver },
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent, title: 'Home' },

  { path: 'login', component: LoginComponent, title: 'Login' },

  { path: 'usuarios', component: UserListComponent, title: 'Usuários' },

  {
    path: 'usuarios/cadastro',
    component: UserFormComponent,
    title: 'Cadastro de Usuário',
  },

  {
    path: 'usuarios/edit/:id',
    component: UserFormComponent,
    resolve: { user: userResolver },
  },

  {
    path: 'pais',
    component: PaisListComponent,
    title: 'Lista de Paises',
  },
  { path: 'pais/cadastro', component: PaisFormComponent, title: 'Novo Pais' },
  {
    path: 'pais/edit/:id',
    component: PaisFormComponent,
    resolve: { pais: paisResolver },
  },

  {
    path: 'desenvolvedoras',
    component: DesenvolvedoraListComponent,
    title: 'Lista de Desenvolvedoras',
  },
  {
    path: 'desenvolvedora/cadastro',
    component: DesenvolvedoraFormComponent,
    title: 'Nova Desenvolvedora',
  },
  {
    path: 'desenvolvedora/edit/:id',
    component: DesenvolvedoraFormComponent,
    resolve: { desenvolvedora: desenvolvedoraResolver },
  },

  {
    path: 'plataformas',
    component: PlataformaListComponent,
    title: 'Lista de Plataformas',
  },
  {
    path: 'plataforma/cadastro',
    component: PlataformaFormComponent,
    title: 'Nova Plataforma',
  },
  {
    path: 'plataforma/edit/:id',
    component: PlataformaFormComponent,
    resolve: { plataforma: plataformaResolver },
  },

  {
    path: 'tela-administrador',
    component: TelaAdministradorComponent,
    title: 'Tela Administrador',
  },

  { path: 'produtos', component: JogoCardListComponent, title: 'Produtos à Venda'},

    { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho de pedidos'},



  ];
