import { TestBed } from '@angular/core/testing';

import { FechaSimuladaService } from './fecha-simulada.service';

describe('FechaSimuladaService', () => {
  let service: FechaSimuladaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechaSimuladaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
