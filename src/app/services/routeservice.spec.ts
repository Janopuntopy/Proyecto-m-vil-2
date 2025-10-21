import { TestBed } from '@angular/core/testing';

import { Routeservice } from './routeservice';

describe('Routeservice', () => {
  let service: Routeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Routeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
