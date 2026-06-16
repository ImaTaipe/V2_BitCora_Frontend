import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPrestamo } from './nuevo-prestamo';

describe('NuevoPrestamo', () => {
  let component: NuevoPrestamo;
  let fixture: ComponentFixture<NuevoPrestamo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoPrestamo],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoPrestamo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
