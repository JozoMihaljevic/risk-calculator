import { TestBed, inject } from '@angular/core/testing';

import { HomaService } from './homa.service';

describe('HomaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomaService]
    });
  });

  it('should be created', inject([HomaService], (service: HomaService) => {
    expect(service).toBeTruthy();
  }));
});
