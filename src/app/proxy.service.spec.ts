import { TestBed } from '@angular/core/testing';

import { ProxyService } from './proxy.service';

describe('ProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    var  service: ProxyService = TestBed.get(ProxyService);
    expect(service).toBeTruthy();
  });
});
