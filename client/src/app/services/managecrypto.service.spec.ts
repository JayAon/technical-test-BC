import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { ManagecryptoService } from './managecrypto.service';

describe('ManagecryptoService', () => {
  let service: ManagecryptoService;
  let testOptions = { response: 200 };
  let controller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ManagecryptoService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return 200 response on request to Service.AddCryptos', fakeAsync(() => {
    let route = 'addCryptos';
    let token = 'valid-token';
    let cryptoid = 1;
    /* Subscribing to the observable returned by the service. */
    service.addCryptos(route, token, cryptoid).subscribe((data) => {
      expect(data).toEqual(testOptions);
    });

    /* Mocking the http request and returning the testOptions array. */
    const request = controller.expectOne('http://localhost:3000/' + route);
    request.flush(testOptions);
  }));

  it('should return 200 response on request to Service.updateCryptos', fakeAsync(() => {
    let route = 'updatecrypto';
    let token = 'valid-token';
    let currentCryptoID = 1;
    let cryptoid = 2;
    /* Subscribing to the observable returned by the service. */
    service
      .updateCryptos(route, token, currentCryptoID, cryptoid)
      .subscribe((data) => {
        expect(data).toEqual(testOptions);
      });

    /* Mocking the http request and returning the testOptions array. */
    const request = controller.expectOne('http://localhost:3000/' + route);
    request.flush(testOptions);
  }));

  it('should return 200 response on request to Service.deletecrypto', fakeAsync(() => {
    let route = 'deletecrypto';
    let token = 'valid-token';
    let cryptoid = 1;
    /* Subscribing to the observable returned by the service. */
    service.deleteCryptos(route, token, cryptoid).subscribe((data) => {
      expect(data).toEqual(testOptions);
    });

    /* Mocking the http request and returning the testOptions array. */
    const request = controller.expectOne('http://localhost:3000/' + route);
    request.flush(testOptions);
  }));
});
