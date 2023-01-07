import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Crypto } from 'src/app/models/crypto';

import { ManagecryptoService } from 'src/app/services/managecrypto.service';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  @Input() countryCrypto: Crypto[] = [];
  @Input() currentCryptoID: number = 0;
  @Input() isEdit: boolean = false;
  selected = 0;
  constructor(
    public modalRef: MdbModalRef<UserModalComponent>,
    private manageCryptos: ManagecryptoService
  ) {}
  ngOnInit(): void {
    this.selected = this.countryCrypto[0].id;
  }

  /**
   * The function takes a string as an argument, converts it to an integer, and assigns it to the
   * selected property
   * @param {string} value - the value of the selected option
   */
  onSelected(value: string): void {
    this.selected = parseInt(value);
  }

  /**
   * If the isEdit variable is true, then we call the editCrypto() function, otherwise we call the
   * addCrypto() function
   */
  saveSelected() {
    if (this.isEdit) {
      this.editCrypto();
    } else {
      this.addCrypto();
    }
  }
  /**
   * It takes the token from local storage, and sends it to the backend, along with the selected
   * crypto, to add it to the user's portfolio
   */
  addCrypto(): void {
    const token = String(localStorage.getItem('authToken'));
    this.manageCryptos.addCryptos('addcrypto', token, this.selected).subscribe({
      next: (data) => {
        this.modalRef.close('Añadido');
      },
      error: (err) => {
        this.modalRef.close('Error');
      },
    });
  }
  /**
   * It takes the data from the form, and sends it to the backend to be updated
   */
  editCrypto(): void {
    const token = String(localStorage.getItem('authToken'));
    this.manageCryptos
      .updateCryptos('updatecrypto', token, this.currentCryptoID, this.selected)
      .subscribe({
        next: (data) => {
          this.modalRef.close('Modificado');
        },
        error: (err) => {
          console.log('repe');
          this.modalRef.close('Error');
        },
      });
  }
}
