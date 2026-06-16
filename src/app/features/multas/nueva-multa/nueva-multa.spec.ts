import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaMulta } from './nueva-multa';

describe('NuevaMulta', () => {
  let component: NuevaMulta;
  let fixture: ComponentFixture<NuevaMulta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaMulta],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaMulta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
