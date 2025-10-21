import { TestBed } from '@angular/core/testing';

import { Cameraservice } from './cameraservice';

describe('Cameraservice', () => {
  let service: Cameraservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cameraservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
