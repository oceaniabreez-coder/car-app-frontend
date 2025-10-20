import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDataCompone } from './car-data-compone';

describe('CarDataCompone', () => {
  let component: CarDataCompone;
  let fixture: ComponentFixture<CarDataCompone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDataCompone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDataCompone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
