import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAdminFormComponent } from './cadastro-admin-form.component';

describe('CadastroAdminFormComponent', () => {
  let component: CadastroAdminFormComponent;
  let fixture: ComponentFixture<CadastroAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAdminFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
