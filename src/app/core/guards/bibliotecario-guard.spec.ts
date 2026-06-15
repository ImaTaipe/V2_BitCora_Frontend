import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bibliotecarioGuard } from './bibliotecario-guard';

describe('bibliotecarioGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => bibliotecarioGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
