import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-encrapter',
  templateUrl: './encrapter.component.html',
  styleUrls: ['./encrapter.component.css']
})
export class EncrapterComponent implements OnInit {
  plaintext: string;
  ciphertext = '';
  plainTable: Array<[string, number]>;
  cipherTable: Array<[string, number]>;
  selectedCipher = 'rot13';

  constructor() {
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
    const plainTable = new Map();
    const cipherTable = new Map();

    for (const c of this.plaintext.toLowerCase().split('')) {
      if (plainTable.has(c)) {
        plainTable.set(c, plainTable.get(c) + 1);
      } else {
        plainTable.set(c, 1);
      }
    }
    for (const c of this.ciphertext.toLowerCase().split('')) {
      if (cipherTable.has(c)) {
        cipherTable.set(c, cipherTable.get(c) + 1);
      } else {
        cipherTable.set(c, 1);
      }
    }
    this.plainTable = Array.from(plainTable).sort(((a: [string, number], b: [string, number]) => b[1] - a[1]));
    this.cipherTable = Array.from(cipherTable).sort(((a: [string, number], b: [string, number]) => b[1] - a[1]));
  }
}
