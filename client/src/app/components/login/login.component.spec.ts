import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  const fakeRouter = {
    navigate: jest.fn,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [LoginComponent],
      providers: [{ provide: Router, useValue: fakeRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  afterEach(() => {
    localStorage.removeItem('authToken');
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to /user direction when there is a authToken in localStorage at init', fakeAsync(() => {
    localStorage.setItem('authToken', 'token');
    jest.spyOn(router, 'navigate');
    component.ngOnInit();
    fixture.detectChanges();

    tick();
    expect(router.navigate).toBeCalledWith(['/user']);
  }));
});
describe('when LoginComponent: Integration LoginService', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  const fakeLoginService: Pick<LoginService, keyof LoginService> = {
    login(username: String, password: String) {
      if (username === 'valid-user') {
        return of({ token: 'validToken' });
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
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: fakeRouter },
        { provide: LoginService, useValue: fakeLoginService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  afterEach(() => {
    localStorage.removeItem('authToken');
  });
  it('should save a localStorage item and redirect to /user when user is valid', fakeAsync(() => {
    jest.spyOn(router, 'navigate');
    jest.spyOn(component, 'onSubmit');
    const form = fixture.debugElement.query(By.css('#form'));
    const user_input = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;
    const pass_input = fixture.debugElement.query(
      By.css('#password')
    ).nativeElement;
    /* Setting the value of the input fields. */
    user_input.focus();
    pass_input.focus();
    user_input.value = 'valid-user';
    pass_input.value = 'valid-password';
    user_input.dispatchEvent(new Event('input'));
    pass_input.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(component.onSubmit).toBeCalled();
    expect(component.isLogged).toBe(true);
    expect(localStorage.getItem('authToken')).toStrictEqual('validToken');
    expect(router.navigate).toBeCalledWith(['/user']);
  }));
  it('should not log in if user is not valid and show a message for 5 seconds', fakeAsync(() => {
    jest.spyOn(router, 'navigate');
    jest.spyOn(component, 'onSubmit');
    const form = fixture.debugElement.query(By.css('#form'));
    const user_input = fixture.debugElement.query(
      By.css('#username')
    ).nativeElement;
    const pass_input = fixture.debugElement.query(
      By.css('#password')
    ).nativeElement;
    /* Setting the value of the input fields. */
    user_input.focus();
    pass_input.focus();
    user_input.value = 'invalid-user';
    pass_input.value = 'invalid-password';
    user_input.dispatchEvent(new Event('input'));
    pass_input.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    form.triggerEventHandler('ngSubmit', null);

    fixture.detectChanges();
    expect(component.onSubmit).toBeCalled();
    expect(component.isLogged).toBe(false);
    tick(5000);
    expect(component.isLogged).toBe(true);
  }));
});
