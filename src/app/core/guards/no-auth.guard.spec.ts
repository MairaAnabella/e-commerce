import { TestBed } from '@angular/core/testing';


import { NoAuthGuard } from './no-auth.guard';

describe('noAuthGuard', () => {
  let executeGuard:NoAuthGuard

  beforeEach(() => {
    TestBed.configureTestingModule({});
    executeGuard = TestBed.inject(NoAuthGuard);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
