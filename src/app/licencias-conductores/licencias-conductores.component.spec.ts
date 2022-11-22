import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenciasConductoresComponent } from './licencias-conductores.component';

describe('LicenciasConductoresComponent', () => {
  let component: LicenciasConductoresComponent;
  let fixture: ComponentFixture<LicenciasConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenciasConductoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenciasConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
