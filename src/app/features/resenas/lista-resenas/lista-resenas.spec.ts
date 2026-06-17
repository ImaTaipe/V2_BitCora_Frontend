import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaResenas } from './lista-resenas';

describe('ListaResenas', () => {
  let component: ListaResenas;
  let fixture: ComponentFixture<ListaResenas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaResenas],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaResenas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
