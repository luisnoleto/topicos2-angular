import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlataformaFabricanteComponent } from './plataforma-fabricante.component';

describe('PlataformaFabricanteComponent', () => {
  let component: PlataformaFabricanteComponent;
  let fixture: ComponentFixture<PlataformaFabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlataformaFabricanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlataformaFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
