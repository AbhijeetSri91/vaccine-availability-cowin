import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineSearchComponent } from './vaccine-search.component';

describe('VaccineSearchComponent', () => {
  let component: VaccineSearchComponent;
  let fixture: ComponentFixture<VaccineSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
