import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerPedidoComponent } from './fazer-pedido.component';

describe('FazerPedidoComponent', () => {
  let component: FazerPedidoComponent;
  let fixture: ComponentFixture<FazerPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazerPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FazerPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
