import { TestBed } from '@angular/core/testing';

import { LibrarianServiceService } from './librarian-service.service';

describe('LibrarianServiceService', () => {
  let service: LibrarianServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrarianServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
