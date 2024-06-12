import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatiantPrescriptionsComponent } from './patiant-prescriptions.component';

describe('PatiantPrescriptionsComponent', () => {
  let component: PatiantPrescriptionsComponent;
  let fixture: ComponentFixture<PatiantPrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatiantPrescriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatiantPrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
