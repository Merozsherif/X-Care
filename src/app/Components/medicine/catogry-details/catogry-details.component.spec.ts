import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatogryDetailsComponent } from './catogry-details.component';

describe('CatogryDetailsComponent', () => {
  let component: CatogryDetailsComponent;
  let fixture: ComponentFixture<CatogryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatogryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatogryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
