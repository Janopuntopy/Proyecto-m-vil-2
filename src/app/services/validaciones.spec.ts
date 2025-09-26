import { TestBed } from '@angular/core/testing';

import { Validaciones } from './validaciones';

describe('Validaciones', () => {
  let service: Validaciones;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Validaciones);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
