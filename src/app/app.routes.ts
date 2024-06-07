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
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  
  {
    path: '',
    component: UserTemplateComponent,
    title: 'e-commerce',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home'},

      { path: 'home', component: HomeComponent, title: 'Home' },

      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'produtos', component: JogoCardListComponent, title: 'Produtos à Venda'},
      { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho de pedidos'},
    ]
  },
  
  {
    path: 'admin',
    component: AdminTemplateComponent,
    title: 'e-commerce',
    children: [
      { path: '', pathMatch: 'full',  redirectTo: 'tela-administrador'},

      { path: 'tela-administrador', component: TelaAdministradorComponent, title: 'Tela Administrador'},

      
      { path: 'usuarios', component: UserListComponent, title: 'Usuários', canActivate: [authGuard] },
      { path: 'usuarios/new', component: UserFormComponent, title: 'Cadastro de Usuário', canActivate: [authGuard]  },
      { path: 'usuarios/edit/:id', component: UserFormComponent, resolve: { user: userResolver } , canActivate: [authGuard]},
      
      { path: 'pais', component: PaisListComponent, title: 'Lista de Paises' , canActivate: [authGuard]},
      { path: 'pais/new', component: PaisFormComponent, title: 'Novo Pais', canActivate: [authGuard] },
      { path: 'pais/edit/:id', component: PaisFormComponent, resolve: { pais: paisResolver } , canActivate: [authGuard]},
      
      { path: 'desenvolvedoras', component: DesenvolvedoraListComponent, title: 'Lista de Desenvolvedoras', canActivate: [authGuard] },
      { path: 'desenvolvedoras/new', component: DesenvolvedoraFormComponent, title: 'Nova Desenvolvedora', canActivate: [authGuard] },
      { path: 'desenvolvedoras/edit/:id', component: DesenvolvedoraFormComponent, resolve: { desenvolvedora: desenvolvedoraResolver }, canActivate: [authGuard] },
      
      { path: 'plataformas', component: PlataformaListComponent, title: 'Lista de Plataformas', canActivate: [authGuard] },
      { path: 'plataformas/new', component: PlataformaFormComponent, title: 'Nova Plataforma',  canActivate: [authGuard]  },
      { path: 'plataformas/edit/:id', component: PlataformaFormComponent, resolve: { plataforma: plataformaResolver }, canActivate: [authGuard] },
      
      { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados' , canActivate: [authGuard]},
      { path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado', canActivate: [authGuard]  },
      { path: 'estados/edit/:id', component: EstadoFormComponent, resolve: { estado: estadoResolver }, canActivate: [authGuard] },
      
      { path: 'municipios', component: MunicipioListComponent, title: 'Lista de Municipios', canActivate: [authGuard] },
      { path: 'municipios/new', component: MunicipioFormComponent, title: 'Novo Municipio', canActivate: [authGuard]  },
      { path: 'municipios/edit/:id', component: MunicipioFormComponent, resolve: { municipio: municipioResolver }, canActivate: [authGuard] },
      
      { path: 'requisitos', component: RequisitoListComponent, title: 'Lista de requisitos', canActivate: [authGuard] },
      { path: 'requisitos/new', component: RequisitoFormComponent, title: 'Novos Requisitos', canActivate: [authGuard]  },
      { path: 'requisitos/edit/:id', component: RequisitoFormComponent, resolve: { requisito: requisitoResolver } , canActivate: [authGuard]},
     
      { path: 'generos', component: GeneroListComponent, title: 'Lista de Generos' , canActivate: [authGuard]},
      { path: 'generos/new', component: GeneroFormComponent, title: 'Novo Genero', canActivate: [authGuard]  },
      { path: 'generos/edit/:id', component: GeneroFormComponent, resolve: { genero: generoResolver } , canActivate: [authGuard]},
      
      { path: 'fabricantes', component: FabricanteListComponent, title: 'Lista de Fabricantes', canActivate: [authGuard] },
      { path: 'fabricantes/new', component: FabricanteFormComponent, title: 'Novo Fabricante', canActivate: [authGuard]  },
      { path: 'fabricantes/edit/:id', component: FabricanteFormComponent, resolve: { fabricante: fabricanteResolver } , canActivate: [authGuard]},
      
      { path: 'jogos', component: JogoListComponent, title: 'Lista de Jogos' , canActivate: [authGuard]},
      { path: 'jogos/new', component: JogoFormComponent, title: 'Novo Jogo', canActivate: [authGuard]  },
      { path: 'jogos/edit/:id', component: JogoFormComponent, resolve: { jogo: jogoResolver } , canActivate: [authGuard]},      
  
    ]
  },
  


  ];
