import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-encrapter',
  templateUrl: './encryption-is-enough.component.html',
  styleUrls: ['./encryption-is-enough.component.css']
})
export class EncryptionIsEnoughComponent implements OnInit {
  plaintext: string;
  ciphertext = '';
  maxplain: number;
  maxcipher: number;
  plainTable: Array<[string, number]>;
  cipherTable: Array<[string, number]>;
  ciphers = ['ROT13', 'Rever', 'One Time Pad'];
  selectedCipher = 'ROT13';


  public questions;
  constructor() {
    this.questions = [

      {prompt: '1) Question one?',
        options: [
          'Answer 0.',
          'Answer 1.',
          'Answer 2.',
          'Answer 3.'
        ],
        answer: '3',
        result: ' '},
      {prompt: '2) Question two?',
        options: [
          'Answer 0.',
          'Answer 1.',
          'Answer 2.',
          'Answer 3.'
        ],
        answer: '0',
        result: ' '}
    ];
  }

  ngOnInit() {
  }

  ROT13(inString) {
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
      c = String.fromCharCode(c ^ 16);
      inString = inString.substr(0, i) + c + inString.substr(i + 1);
    }
    return inString.split('').reverse().join('');
  }

  onetp(inString) {
    return 'One Time Pad';
  }

  updateCiphertext() {
    switch (this.selectedCipher) {
      case 'ROT13':
        this.ciphertext = this.ROT13(this.plaintext);
        break;
      case 'Rever':
        this.ciphertext = this.rever(this.plaintext);
        break;
      case 'One Time Pad':
        this.ciphertext = this.onetp(this.plaintext);
        break;
    }
    this.updateTables();
  }

  getColor(n, m) {
    if (m === 1) {
      return '#00ff00';
    }
    const i = Math.floor(255 * ((n - 1) / (m - 1)));
    let c1 = i.toString(16);
    let c2 = (255 - i).toString(16);
    if (c1.length < 2) {
      c1 = '0' + c1;
    }
    if (c2.length < 2) {
      c2 = '0' + c2;
    }
    return '#' + c2 + c1;
  }


  updateTables() {
    // Clear old tables, like if the user copy/pastes
    const plainTable = new Map();
    const cipherTable = new Map();
    this.maxplain = 1;
    this.maxcipher = 1;

    for (const c of this.plaintext.toLowerCase().split('')) {
      if (plainTable.has(c)) {
        plainTable.set(c, plainTable.get(c) + 1);
      } else {
        plainTable.set(c, 1);
      }
      if (plainTable.get(c) > this.maxplain) {
        this.maxplain += 1;
      }
    }
    for (const c of this.ciphertext.toLowerCase().split('')) {
      if (cipherTable.has(c)) {
        cipherTable.set(c, cipherTable.get(c) + 1);
      } else {
        cipherTable.set(c, 1);
      }
      if (cipherTable.get(c) > this.maxcipher) {
        this.maxcipher += 1;
      }
    }
    this.plainTable = Array.from(plainTable).sort(((a: [string, number], b: [string, number]) => b[1] - a[1]));
    this.cipherTable = Array.from(cipherTable).sort(((a: [string, number], b: [string, number]) => b[1] - a[1]));
  }
}
