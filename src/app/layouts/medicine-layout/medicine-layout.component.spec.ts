import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineLayoutComponent } from './medicine-layout.component';

describe('MedicineLayoutComponent', () => {
  let component: MedicineLayoutComponent;
  let fixture: ComponentFixture<MedicineLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
