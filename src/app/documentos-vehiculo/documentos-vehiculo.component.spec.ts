import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosVehiculoComponent } from './documentos-vehiculo.component';

describe('DocumentosVehiculoComponent', () => {
  let component: DocumentosVehiculoComponent;
  let fixture: ComponentFixture<DocumentosVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
