/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavService } from './fav.service';

describe('Service: Fav', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavService]
    });
  });

  it('should ...', inject([FavService], (service: FavService) => {
    expect(service).toBeTruthy();
  }));
});
