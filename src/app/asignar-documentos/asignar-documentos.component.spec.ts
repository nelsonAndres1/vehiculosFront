import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarDocumentosComponent } from './asignar-documentos.component';

describe('AsignarDocumentosComponent', () => {
  let component: AsignarDocumentosComponent;
  let fixture: ComponentFixture<AsignarDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
