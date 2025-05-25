import { TestBed } from '@angular/core/testing';

import { ClientesVipService } from './clientes-vip.service';

describe('ClientesVipService', () => {
  let service: ClientesVipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesVipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
