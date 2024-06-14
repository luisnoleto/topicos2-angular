import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusPedidosComponent } from './meus-pedidos.component';

describe('MeusPedidosComponent', () => {
  let component: MeusPedidosComponent;
  let fixture: ComponentFixture<MeusPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeusPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
