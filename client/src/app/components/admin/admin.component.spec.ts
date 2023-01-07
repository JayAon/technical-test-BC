import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbTabComponent, MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { of } from 'rxjs';
import { Country } from 'src/app/models/country';
import { Crypto } from 'src/app/models/crypto';
import { Manager } from 'src/app/models/manager';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { AdminComponent } from './admin.component';

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

/* Creating an empty array of the type Country, Manager, and User. */
const countries: Country[] = [{ id: 1, name: 'country_test' }];
const managers: Manager[] = [{ id: 1, name: 'manager_test' }];
const users: User[] = [{ id: 1, name: 'user_test', country_id: 1 }];

/* An array of the three arrays that are being used in the select dropdown. */
const select_data = [countries, managers, users];

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MdbTabsModule,
        BrowserAnimationsModule,
      ],
      declarations: [AdminComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    component.select_data = select_data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the child component', () => {
    const counter = findComponent(fixture, 'app-crypto-list');
    expect(counter).toBeTruthy();
  });
  it('should lazy load the content', () => {
    const select = fixture.debugElement.queryAll(By.css('select'));
    expect(select.length).toEqual(1);
  });
  it('should call the onSelect function when an option of the dropdown is selected', fakeAsync(() => {
    jest.spyOn(component, 'onSelect');
    jest.spyOn(component, 'getCryptos');
    const select = fixture.debugElement.query(By.css('select'));
    select.triggerEventHandler('change', null);
    tick();
    expect(component.onSelect).toHaveBeenCalled();
    expect(component.getCryptos).toHaveBeenCalled();
  }));

  it('should call "onTabChange" function when changing tabs', fakeAsync(() => {
    jest.spyOn(component, 'onGetActiveTab');
    jest.spyOn(component, 'getSelectList');
    const tabs = fixture.debugElement.query(By.css('#tabs'));
    const titles = ['Paises', 'Usuarios', 'Gestores', ''];
    for (let title of titles) {
      tabs.triggerEventHandler('activeTabChange', {
        tab: {
          title,
        },
      });
    }
    tick();
    expect(component.onGetActiveTab).toHaveBeenCalledTimes(titles.length);
    expect(component.getSelectList).toHaveBeenCalled();
  }));
});
describe('when AdminComponent: Integration AdminService', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let cryptoTest: Crypto[] = [
    { id: 1, symbol: 'TST', name: 'test', value: 0 },
    { id: 2, symbol: 'TST', name: 'test', value: 0 },
  ];
  let testOptions: Country[] = [
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' },
  ];
  const fakeAdminService: Pick<AdminService, keyof AdminService> = {
    getCryptos(route: string, id: number) {
      return of({ cryptos: cryptoTest });
    },
    getSelectList(route: string) {
      return of(testOptions);
    },
  };
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MdbTabsModule,
        BrowserAnimationsModule,
      ],
      declarations: [AdminComponent],
      providers: [{ provide: AdminService, useValue: fakeAdminService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should populate the select list with the response of the AdminService', () => {
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(select.options.length).toEqual(testOptions.length);
    expect(select.options[0].value).toStrictEqual(String(testOptions[0].id));
    expect(String(select.options[0].innerHTML).trim()).toStrictEqual(
      String(testOptions[0].name)
    );
  });
  it('should populate the app-crypto-list component with the response of the AdminService', () => {
    const counter = findComponent(fixture, 'app-crypto-list');
    expect(counter.properties['listCrypto']).toEqual(cryptoTest);
  });
});
