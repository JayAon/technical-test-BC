import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { of, throwError } from 'rxjs';
import { Crypto } from 'src/app/models/crypto';
import { ManagecryptoService } from 'src/app/services/managecrypto.service';

import { UserModalComponent } from './user-modal.component';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let cryptoTest: Crypto[] = [{ id: 1, symbol: 'TST', name: 'test', value: 0 }];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MdbModalModule],
      providers: [{ provide: MdbModalRef, useValue: {} }],
      declarations: [UserModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    component.countryCrypto = cryptoTest;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase the list length when a new crypto is available for the country', () => {
    /* Testing the length of the select options. */
    const select: HTMLSelectElement = fixture.debugElement.query(
      By.css('#selectedcrypto')
    ).nativeElement;

    const initial_length = select.options.length;
    let cryptoTest: Crypto[] = [
      { id: 1, symbol: 'TST', name: 'test', value: 0 },
      { id: 2, symbol: 'TST', name: 'test', value: 0 },
    ];

    component.countryCrypto = cryptoTest;
    fixture.detectChanges();
    const final_length = select.options.length;

    expect(final_length).toBeGreaterThan(initial_length);
  });

  it('should call the onSelected function when change event is triggered', fakeAsync(() => {
    jest.spyOn(component, 'onSelected');
    const select = fixture.debugElement.query(By.css('#selectedcrypto'));

    select.triggerEventHandler('change', null);
    fixture.detectChanges();
    expect(component.onSelected).toHaveBeenCalled();
  }));
  it('should call the saveSelected function when saveButton is pressed and call addCrypto by default', fakeAsync(() => {
    jest.spyOn(component, 'saveSelected');
    jest.spyOn(component, 'addCrypto');
    let button = fixture.debugElement.query(
      By.css('#saveButton')
    ).nativeElement;
    button.click();
    tick();
    expect(component.saveSelected).toHaveBeenCalled();
    expect(component.addCrypto).toHaveBeenCalled();
  }));
  it('should call the saveSelected  and the editCrypto function when saveButton is pressed and isEdit is true', fakeAsync(() => {
    jest.spyOn(component, 'saveSelected');
    jest.spyOn(component, 'editCrypto');
    let button = fixture.debugElement.query(
      By.css('#saveButton')
    ).nativeElement;
    component.isEdit = true;
    fixture.detectChanges();
    button.click();
    tick();
    expect(component.saveSelected).toHaveBeenCalled();
    expect(component.editCrypto).toHaveBeenCalled();
  }));
});

describe('when UserModalComponent: Integration ManageCryptoService', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let router: Router;
  let modalMessage: any;
  const modal: Pick<MdbModalRef<UserModalComponent>, 'close'> = {
    close(message?: any) {
      modalMessage = message;
    },
  };
  let cryptoTest: Crypto[] = [{ id: 1, symbol: 'TST', name: 'test', value: 0 }];
  const fakeManageService: Pick<
    ManagecryptoService,
    'addCryptos' | 'updateCryptos'
  > = {
    addCryptos(route: string, token: string, cryptoid: number) {
      if (token === 'validToken') {
        return of(200);
      }
      return throwError(() => {
        return { status: 403, message: 'error' };
      });
    },
    updateCryptos(
      route: string,
      token: string,
      currentCryptoID: number,
      cryptoid: number
    ) {
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
      imports: [HttpClientTestingModule, MdbModalModule, RouterTestingModule],
      providers: [
        { provide: MdbModalRef, useValue: modal },
        { provide: ManagecryptoService, useValue: fakeManageService },
      ],
      declarations: [UserModalComponent],

      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.countryCrypto = cryptoTest;
    fixture.detectChanges();
  });
  afterEach(() => {
    localStorage.removeItem('authToken');
  });
  it('should close the modal with a Añadido message when the ManageCrypto.addCrypto is successfull', fakeAsync(() => {
    localStorage.setItem('authToken', 'validToken');
    component.addCrypto();
    fixture.detectChanges();

    expect(modalMessage).toStrictEqual('Añadido');
  }));

  it('should close the modal with a Error message when the ManageCrypto.addCrypto is unsuccessfull', fakeAsync(() => {
    localStorage.setItem('authToken', 'error');
    component.addCrypto();
    fixture.detectChanges();

    expect(modalMessage).toStrictEqual('Error');
  }));

  it('should close the modal with a Modificado message when the ManageCrypto.editCrypto is successfull', fakeAsync(() => {
    localStorage.setItem('authToken', 'validToken');
    component.editCrypto();
    fixture.detectChanges();

    expect(modalMessage).toStrictEqual('Modificado');
  }));

  it('should close the modal with a Error message when the ManageCrypto.editCrypto is unsuccessfull', fakeAsync(() => {
    localStorage.setItem('authToken', 'error');
    component.editCrypto();
    fixture.detectChanges();

    expect(modalMessage).toStrictEqual('Error');
  }));
});
