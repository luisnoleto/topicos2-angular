import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesenvolvedoraListComponent } from './desenvolvedora-list.component';

describe('DesenvolvedoraListComponent', () => {
  let component: DesenvolvedoraListComponent;
  let fixture: ComponentFixture<DesenvolvedoraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesenvolvedoraListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesenvolvedoraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
