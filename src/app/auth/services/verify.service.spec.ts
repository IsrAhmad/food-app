/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VerifyService } from './verify.service';

describe('Service: Verify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyService]
    });
  });

  it('should ...', inject([VerifyService], (service: VerifyService) => {
    expect(service).toBeTruthy();
  }));
});
