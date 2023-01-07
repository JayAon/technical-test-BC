import { Component, OnInit } from '@angular/core';
import { Crypto } from 'src/app/models/crypto';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CryptoService } from 'src/app/services/crypto.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ManagecryptoService } from 'src/app/services/managecrypto.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  /* This is declaring the two arrays that will be used in the component. */
  thisList: Crypto[] = [];
  countryCrypto: Crypto[] = [];
  /* This is declaring the modalRef variable as a MdbModalRef type, and setting it to null. */
  modalRef: MdbModalRef<UserModalComponent> | null = null;
  constructor(
    private modalService: MdbModalService,
    private cryptoList: CryptoService,
    private router: Router,
    private manageCryptos: ManagecryptoService
  ) {}

  /**
   * The function opens a modal and subscribes to the modal's onClose event
   */
  openModal() {
    this.modalRef = this.modalService.open(UserModalComponent, {
      modalClass: 'modal-dialog-centered ',
      data: {
        countryCrypto: this.countryCrypto,
      },
    });
    this.modalRef.onClose.subscribe((message: any) => {
      this.getCryptosData();
    });
  }
  /**
   * This function opens a modal window with the UserModalComponent component, and passes the
   * countryCrypto array, the currentCryptoID, and a boolean value of true to the modal
   * @param {number} key - number - the key of the crypto you want to edit
   */
  editButton(key: number) {
    this.modalRef = this.modalService.open(UserModalComponent, {
      modalClass: 'modal-dialog-centered ',
      data: {
        countryCrypto: this.countryCrypto,
        currentCryptoID: key,
        isEdit: true,
      },
    });
    this.modalRef.onClose.subscribe((message: any) => {
      this.getCryptosData();
    });
  }
  /**
   * It deletes a crypto from the database
   * @param {number} key - number - The key of the crypto you want to delete.
   */
  deleteButton(key: number) {
    if (localStorage.getItem('authToken')) {
      this.manageCryptos
        .deleteCryptos(
          'deletecrypto',
          String(localStorage.getItem('authToken')),
          key
        )
        .subscribe({
          next: (data) => {
            this.getCryptosData();
          },
          error: (err) => {
            localStorage.removeItem('authToken');
            this.router.navigate(['/']);
          },
        });
    } else {
      this.router.navigate(['/']);
    }
  }
  /**
   * This function checks if the user has a valid authToken in localStorage, if they do, it will call the
   * cryptoList function in the cryptoList service and pass in the parameters "test" and the authToken.
   * If the authToken is valid, the user will be able to see the list of cryptos. If the authToken is
   * invalid, the user will be redirected to the login page
   */
  getCryptosData(): void {
    if (localStorage.getItem('authToken')) {
      const token = String(localStorage.getItem('authToken'));
      this.cryptoList.cryptoList('test', token).subscribe({
        next: (data) => {
          this.thisList = data.cryptos;
        },
        error: (err) => {
          localStorage.removeItem('authToken');
          this.router.navigate(['/']);
        },
      });
      this.cryptoList
        .cryptoList(String('countrycryptos'), String(token))
        .subscribe({
          next: (data) => {
            this.countryCrypto = data.cryptos;
          },
          error: (err) => {
            this.router.navigate(['/']);
          },
        });
    } else {
      this.router.navigate(['/']);
    }
  }
  /**
   * The ngOnInit() function is a lifecycle hook that is called after Angular has initialized all
   * data-bound properties of a directive
   */
  ngOnInit(): void {
    this.getCryptosData();
  }
}
