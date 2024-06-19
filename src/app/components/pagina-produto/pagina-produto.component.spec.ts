import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaProdutoComponent } from './pagina-produto.component';

describe('PaginaProdutoComponent', () => {
  let component: PaginaProdutoComponent;
  let fixture: ComponentFixture<PaginaProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
