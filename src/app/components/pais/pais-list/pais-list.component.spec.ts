import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisListComponent } from './pais-list.component';

describe('PaisListComponent', () => {
  let component: PaisListComponent;
  let fixture: ComponentFixture<PaisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
