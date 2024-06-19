import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselFormComponent } from './carousel-form.component';

describe('CarouselFormComponent', () => {
  let component: CarouselFormComponent;
  let fixture: ComponentFixture<CarouselFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
