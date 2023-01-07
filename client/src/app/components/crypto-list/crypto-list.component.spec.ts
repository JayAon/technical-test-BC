import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CryptoListComponent } from './crypto-list.component';

describe('CryptoListComponent', () => {
  let component: CryptoListComponent;
  let fixture: ComponentFixture<CryptoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CryptoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CryptoListComponent);
    component = fixture.componentInstance;
    component.listCrypto = [{ id: 1, symbol: 'TST', name: 'test', value: 0 }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute function on crypto deletion', fakeAsync(() => {
    jest.spyOn(component, 'deleteBtn');
    let button = fixture.debugElement.query(By.css('.deleteBtn')).nativeElement;
    button.click();
    tick();
    expect(component.deleteBtn).toHaveBeenCalled();
  }));

  it('should execute function on crypto edit', fakeAsync(() => {
    jest.spyOn(component, 'editBtn');
    let button = fixture.debugElement.query(By.css('.editBtn')).nativeElement;
    button.click();
    tick();
    expect(component.editBtn).toHaveBeenCalled();
  }));
});
