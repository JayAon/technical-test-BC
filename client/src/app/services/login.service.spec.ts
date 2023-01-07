import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let controller: HttpTestingController;
  let testOptions = { token: 'token' };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a token when user logs in ', fakeAsync(() => {
    let route = 'login';
    let username = 'username';
    let password = 'password';

    /* Subscribing to the observable returned by the service. */
    service.login(username, password).subscribe((data) => {
      expect(data).toEqual(testOptions);
    });

    /* Mocking the http request and returning the testOptions array. */
    const request = controller.expectOne('http://localhost:3000/' + route);
    request.flush(testOptions);
  }));
});
