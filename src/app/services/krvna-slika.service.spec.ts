import { TestBed, inject } from '@angular/core/testing';

import { KrvnaSlikaService } from './krvna-slika.service';

describe('KrvnaSlikaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KrvnaSlikaService]
    });
  });

  it('should be created', inject([KrvnaSlikaService], (service: KrvnaSlikaService) => {
    expect(service).toBeTruthy();
  }));
});
