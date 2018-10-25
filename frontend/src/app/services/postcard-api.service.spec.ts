import { TestBed } from '@angular/core/testing';

import { PostcardApiService } from './postcard-api.service';

describe('PostcardAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostcardApiService = TestBed.get(PostcardApiService);
    expect(service).toBeTruthy();
  });
});
