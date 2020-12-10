import { TestBed } from '@angular/core/testing';

import { UrlPermissionService } from './url-permission.service';

describe('UrlPermissionService', () => {
  let service: UrlPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
