import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-encrapter',
  templateUrl: './encrapter.component.html',
  styleUrls: ['./encrapter.component.css']
})
export class EncrapterComponent implements OnInit {
  plaintext: string;
  ciphertext = '';
  plainTable: Map<string, number>;
  cipherTable: Map<string, number>;
  selectedCipher = 'rot13';

  constructor() {
    this.plainTable = new Map();
    this.cipherTable = new Map();
  }

  ngOnInit() {
  }

  rot13(inString) {
    const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    const index = x => input.indexOf(x);
    const translate = x => index(x) > -1 ? output[index(x)] : x;
    return inString.split('').map(translate).join('');
  }

  rever(inString) {
    for (let i = 0; i < inString.length; i++) {
      let c = inString.charCodeAt(i);
      // tslint:disable-next-line:no-bitwise
      c = String.fromCharCode(c ^ 64);
      inString = inString.substr(0, i) + c + inString.substr(i + 1);
    }
    return inString.split('').reverse().join('');
  }

  onetp(inString) {
    return 'onetp';
  }

  changeEncryptionType(inarg) {
    this.selectedCipher = inarg;
    this.updateCiphertext();
  }


  updateCiphertext() {
    switch (this.selectedCipher) {
      case 'rot13':
        this.ciphertext = this.rot13(this.plaintext);
        break;
      case 'rever':
        this.ciphertext = this.rever(this.plaintext);
        break;
      case 'onetp':
        this.ciphertext = this.onetp(this.plaintext);
        break;
    }
    this.updateTables();
  }

  updateTables() {
    // Clear old tables, like if the user copy/pastes
    this.plainTable = new Map();
    this.cipherTable = new Map();
    for (const c of this.plaintext.toLowerCase().replace(' ', '').split('')) {
      if (this.plainTable.has(c)) {
        this.plainTable.set(c, this.plainTable.get(c) + 1);
      } else {
        this.plainTable.set(c, 1);
      }
    }
    for (const c of this.ciphertext.toLowerCase().replace(' ', '').split('')) {
      if (this.cipherTable.has(c)) {
        this.cipherTable.set(c, this.cipherTable.get(c) + 1);
      } else {
        this.cipherTable.set(c, 1);
      }
    }
    console.log(this.plainTable, this.cipherTable);
  }
}
