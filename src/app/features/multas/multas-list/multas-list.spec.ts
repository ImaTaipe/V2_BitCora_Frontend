import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultasList } from './multas-list';

describe('MultasList', () => {
  let component: MultasList;
  let fixture: ComponentFixture<MultasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultasList],
    }).compileComponents();

    fixture = TestBed.createComponent(MultasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
