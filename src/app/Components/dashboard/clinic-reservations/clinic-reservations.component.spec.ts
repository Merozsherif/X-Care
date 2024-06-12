import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicReservationsComponent } from './clinic-reservations.component';

describe('ClinicReservationsComponent', () => {
  let component: ClinicReservationsComponent;
  let fixture: ComponentFixture<ClinicReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicReservationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
