import { TestBed } from '@angular/core/testing';

import { PostcardStoreService } from './postcard-store.service';

describe('PostcardStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostcardStoreService = TestBed.get(PostcardStoreService);
    expect(service).toBeTruthy();
  });
});
