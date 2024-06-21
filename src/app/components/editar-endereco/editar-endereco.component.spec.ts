import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEnderecoComponent } from './editar-endereco.component';

describe('EditarEnderecoComponent', () => {
  let component: EditarEnderecoComponent;
  let fixture: ComponentFixture<EditarEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEnderecoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
