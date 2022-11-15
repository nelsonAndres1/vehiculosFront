import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clase_vehiculoComponent } from './clase_vehiculo.component';


describe('Clase_vehiculoComponent', () => {
  let component: Clase_vehiculoComponent;
  let fixture: ComponentFixture<Clase_vehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Clase_vehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Clase_vehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
