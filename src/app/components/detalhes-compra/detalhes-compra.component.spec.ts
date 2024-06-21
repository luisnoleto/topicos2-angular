import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCompraComponent } from './detalhes-compra.component';

describe('DetalhesCompraComponent', () => {
  let component: DetalhesCompraComponent;
  let fixture: ComponentFixture<DetalhesCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesCompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalhesCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
