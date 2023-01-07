import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Crypto } from 'src/app/models/crypto';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss'],
})
export class CryptoListComponent implements OnInit {
  @Input() listCrypto: Crypto[] = [];
  @Output('delete') delete: EventEmitter<any> = new EventEmitter();
  @Output('edit') edit: EventEmitter<any> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}
  /**
   * The deleteBtn function takes a key as a parameter and emits an event with the key as a parameter
   * @param {number} key - number - The key of the item to be deleted.
   */
  deleteBtn(key: number) {
    this.delete && this.delete.emit({ param1: key });
  }
  /**
   * The function takes a number as a parameter and emits an object with a key of param1 and a value of
   * the number passed in
   * @param {number} key - number - This is the key of the item that we want to edit.
   */
  editBtn(key: number) {
    this.edit && this.edit.emit({ param1: key });
  }
}
