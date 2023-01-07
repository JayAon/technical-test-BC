import { fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('client');
  });
});

// describe('Router:App', () => {
//   let location: Location;
//   let router: Router;
//   let fixture;
//   let loginComponent: LoginComponent;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule.withRoutes(routes)],
//       declarations: [LoginComponent, UserComponent, AdminComponent],
//     }).compileComponents();
//   });
//   beforeEach(() => {
//     router = TestBed.inject(Router);
//     fixture = TestBed.createComponent(AppComponent);
//     router.initialNavigation();
//   });

//   it(`should create login component when navigate to ''`, fakeAsync(() => {
//     router.navigate(['']).then(() => {
//       expect(loginComponent).toBeTruthy();
//     });
//   }));
// });
