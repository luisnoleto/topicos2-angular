import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesenvolvedoraFormComponent } from './desenvolvedora-form.component';

describe('DesenvolvedoraFormComponent', () => {
  let component: DesenvolvedoraFormComponent;
  let fixture: ComponentFixture<DesenvolvedoraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesenvolvedoraFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesenvolvedoraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
