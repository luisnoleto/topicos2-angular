import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPedidoComponent } from './historico-pedido.component';

describe('HistoricoPedidoComponent', () => {
  let component: HistoricoPedidoComponent;
  let fixture: ComponentFixture<HistoricoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
