import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AsyncService } from './async.service';

describe('AsyncService', () => {
  let service: AsyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delay', <any>fakeAsync((): void => {
    let test = false
    AsyncService.delay(1000).then(() => {
      test = true
    })
    expect(test).toBe(false)
    tick(500)
    expect(test).toBe(false)
    tick(500)
    expect(test).toBe(true)
  }));

});
