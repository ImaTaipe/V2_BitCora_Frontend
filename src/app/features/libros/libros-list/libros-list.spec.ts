import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosList } from './libros-list';

describe('LibrosList', () => {
  let component: LibrosList;
  let fixture: ComponentFixture<LibrosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosList],
    }).compileComponents();

    fixture = TestBed.createComponent(LibrosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
