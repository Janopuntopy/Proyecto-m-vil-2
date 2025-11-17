import { TestBed } from '@angular/core/testing';

import { Emailservice } from './emailservice';

describe('Emailservice', () => {
  let service: Emailservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Emailservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
