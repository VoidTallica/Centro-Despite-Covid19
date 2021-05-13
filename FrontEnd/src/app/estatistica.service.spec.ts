import { TestBed } from '@angular/core/testing';

import { EstatisticaService } from './estatistica.service';

describe('EstatisticaService', () => {
  let service: EstatisticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstatisticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
