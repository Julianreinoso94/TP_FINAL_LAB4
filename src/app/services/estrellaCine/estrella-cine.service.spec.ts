import { TestBed } from '@angular/core/testing';

import { EstrellaCineService } from './estrella-cine.service';

describe('EstrellaCineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstrellaCineService = TestBed.get(EstrellaCineService);
    expect(service).toBeTruthy();
  });
});
