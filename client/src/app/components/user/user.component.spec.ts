import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { MdbModalModule, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { of, throwError } from 'rxjs';
import { Crypto } from 'src/app/models/crypto';
import { ManagecryptoService } from 'src/app/services/managecrypto.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { CryptoListComponent } from '../crypto-list/crypto-list.component';
import { UserModalComponent } from '../user-modal/user-modal.component';

import { UserComponent } from './user.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let countryCrypto: Crypto[] = [
    { id: 1, symbol: 'TST', name: 'test', value: 0 },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdbModalModule, HttpClientTestingModule],
      declarations: [UserComponent, UserModalComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.countryCrypto = countryCrypto;
    fixture.detectChanges();
  });

  it('should create the child component', () => {
    const counter = findComponent(fixture, 'app-crypto-list');
    expect(counter).toBeTruthy();
  });

  it('should start the child component with an empty array', () => {
    const counter = findComponent(fixture, 'app-crypto-list');
    let thisList: Crypto[] = [];
    expect(counter.properties['listCrypto']).toEqual(thisList);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the openModal function when openBtn is clicked', fakeAsync(() => {
    jest.spyOn(component, 'openModal');
    const button = fixture.debugElement.query(By.css('#openBtn')).nativeElement;
    button.click();
    tick(600);
    expect(component.openModal).toHaveBeenCalled();
  }));

  it('should call the getCryptoData function when modal is closed and was opened', fakeAsync(() => {
    jest.spyOn(component, 'getCryptosData');
    const button = fixture.debugElement.query(By.css('#openBtn')).nativeElement;
    button.click();
    tick(600);
    component.modalRef?.close();
    tick(600);
    expect(component.getCryptosData).toHaveBeenCalled();
  }));

  it('should call the editButton function when edit event is triggered', fakeAsync(() => {
    jest.spyOn(component, 'editButton');
    const counter = fixture.debugElement.query(By.css('app-crypto-list'));
    counter.triggerEventHandler('edit', {
      param1: 1,
    });
    fixture.detectChanges();
    tick(600);
    expect(component.editButton).toHaveBeenCalled();
  }));

  it('should call the getCryptoData function when editModal is closed', fakeAsync(() => {
    jest.spyOn(component, 'getCryptosData');
    const counter = fixture.debugElement.query(By.css('app-crypto-list'));
    counter.triggerEventHandler('edit', {
      param1: 1,
    });
    fixture.detectChanges();
    tick(600);
    component.modalRef?.close();
    tick(600);
    expect(component.getCryptosData).toHaveBeenCalled();
  }));
});
describe('when UserComponent: Integration with CryptoService', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let router: Router;

  let cryptoTest: Crypto[] = [
    { id: 1, symbol: 'TST', name: 'test', value: 0 },
    { id: 2, symbol: 'TST', name: 'test', value: 0 },
  ];
  const fakeCryptoService: Pick<CryptoService, keyof CryptoService> = {
    cryptoList(route: String, token: String) {
      if (token === 'validToken') {
        return of({ cryptos: cryptoTest });
      }
      return throwError(() => {
        return { status: 403, message: 'error' };
      });
    },
  };
  const fakeRouter = {
    navigate: jest.fn,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdbModalModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [UserComponent, UserModalComponent],
      providers: [
        { provide: CryptoService, useValue: fakeCryptoService },
        { provide: Router, useValue: fakeRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  afterEach(() => {
    localStorage.removeItem('authToken');
  });

  it('should populate the app-crypto-list component with the response of the Crypto service at init', fakeAsync(() => {
    localStorage.setItem('authToken', 'validToken');
    component.ngOnInit();
    fixture.detectChanges();
    const counter = findComponent(fixture, 'app-crypto-list');
    tick();
    expect(counter.properties['listCrypto']).toEqual(cryptoTest);
  }));
  it('should go to / direction when the Crypto service returns with an error at init', fakeAsync(() => {
    localStorage.setItem('authToken', 'error');
    jest.spyOn(router, 'navigate');
    component.ngOnInit();
    fixture.detectChanges();

    tick();
    expect(router.navigate).toBeCalledWith(['/']);
  }));
  it('should go to / direction when there is no authToken in localStorage at init', fakeAsync(() => {
    localStorage.clear();
    jest.spyOn(router, 'navigate');
    component.ngOnInit();
    fixture.detectChanges();

    tick();
    expect(router.navigate).toBeCalledWith(['/']);
  }));
});

describe('when UserComponent: Integration with ManageCrypto', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let router: Router;
  const fakeManageService: Pick<ManagecryptoService, 'deleteCryptos'> = {
    deleteCryptos(route: string, token: string, cryptoid: number) {
      if (token === 'validToken') {
        return of(200);
      }
      return throwError(() => {
        return { status: 403, message: 'error' };
      });
    },
  };
  const fakeRouter = {
    navigate: jest.fn,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdbModalModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [UserComponent, UserModalComponent],
      providers: [
        { provide: ManagecryptoService, useValue: fakeManageService },
        { provide: Router, useValue: fakeRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });
  afterEach(() => {
    localStorage.removeItem('authToken');
  });
  it('should call the deleteButton function when delete event is triggered', fakeAsync(() => {
    jest.spyOn(component, 'deleteButton');
    const counter = fixture.debugElement.query(By.css('app-crypto-list'));
    counter.triggerEventHandler('delete', {
      param1: 1,
    });
    fixture.detectChanges();
    tick(600);
    expect(component.deleteButton).toHaveBeenCalled();
  }));

  it('should call the getCryptosData when the response of the ManageCrypto.delete service is 200', fakeAsync(() => {
    jest.spyOn(component, 'getCryptosData');
    localStorage.setItem('authToken', 'validToken');
    component.deleteButton(1);
    fixture.detectChanges();
    tick();
    expect(component.getCryptosData).toHaveBeenCalled();
  }));
  it('should go to / direction when the ManageCrypto.delete service returns with an error', fakeAsync(() => {
    localStorage.setItem('authToken', 'error');
    jest.spyOn(router, 'navigate');
    component.deleteButton(1);
    fixture.detectChanges();

    tick();
    expect(router.navigate).toBeCalledWith(['/']);
  }));
  it('should go to / direction when there is no authToken in localStorage at delete', fakeAsync(() => {
    localStorage.clear();
    jest.spyOn(router, 'navigate');
    component.deleteButton(1);
    fixture.detectChanges();

    tick();
    expect(router.navigate).toBeCalledWith(['/']);
  }));
});
