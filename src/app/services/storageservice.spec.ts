import { TestBed } from '@angular/core/testing';

import { Storageservice } from './storageservice';

describe('Storageservice', () => {
  let service: Storageservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Storageservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
