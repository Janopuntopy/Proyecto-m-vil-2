import { TestBed } from '@angular/core/testing';

import { Bdlocal } from './bdlocal';

describe('Bdlocal', () => {
  let service: Bdlocal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bdlocal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
