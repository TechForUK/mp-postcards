import { TestBed } from '@angular/core/testing';

import { MpStoreService } from './mp-store.service';

describe('MpStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MpStoreService = TestBed.get(MpStoreService);
    expect(service).toBeTruthy();
  });
});
