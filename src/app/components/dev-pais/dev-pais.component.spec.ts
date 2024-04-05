import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPaisComponent } from './dev-pais.component';

describe('DevPaisComponent', () => {
  let component: DevPaisComponent;
  let fixture: ComponentFixture<DevPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevPaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
