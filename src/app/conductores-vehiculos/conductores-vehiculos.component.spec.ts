import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductoresVehiculosComponent } from './conductores-vehiculos.component';

describe('ConductoresVehiculosComponent', () => {
  let component: ConductoresVehiculosComponent;
  let fixture: ComponentFixture<ConductoresVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConductoresVehiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConductoresVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
