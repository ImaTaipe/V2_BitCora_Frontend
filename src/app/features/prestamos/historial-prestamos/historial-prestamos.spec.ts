import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPrestamos } from './historial-prestamos';

describe('HistorialPrestamos', () => {
  let component: HistorialPrestamos;
  let fixture: ComponentFixture<HistorialPrestamos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialPrestamos],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialPrestamos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
