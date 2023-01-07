import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let controller: HttpTestingController;
  let testOptions = [
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AdminService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return all the countries on request', fakeAsync(() => {
    let route = 'getcountries';

    /* Subscribing to the observable returned by the service. */
    service.getSelectList(route).subscribe((data) => {
      expect(data).toEqual(testOptions);
    });

    /* Mocking the http request and returning the testOptions array. */
    const request = controller.expectOne('http://localhost:3000/' + route);
    request.flush(testOptions);
  }));
});
