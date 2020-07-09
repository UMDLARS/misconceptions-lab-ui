import {Component, OnInit} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-hmac-exercise',
  templateUrl: './hmac-exercise.component.html',
  styleUrls: ['./hmac-exercise.component.css']
})
export class HmacExerciseComponent implements OnInit {

  key = 'Bakebot is the best';
  cipherObject: any;
  cipherParams = {
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding
  };

  plainText = 20;
  cipherText = '';
  decryptedText = '';
  transformMask = Array(32);

  constructor() {
    // Enhanced for loop doesn't work for some reason, checking one box changes all
    for (let i = 0; i < 32; i++) {
      this.transformMask[i] = {value: 2 ** (31 - i), checked: false};
    }
  }

  ngOnInit() {
    this.updateCipherText();
  }

  updateCipherText() {
    const buffer = new ArrayBuffer(4);
    new DataView(buffer).setInt32(0, this.plainText, false);

    this.cipherObject = CryptoJS.AES.encrypt(CryptoJS.lib.WordArray.create(buffer), this.key, this.cipherParams);
    // Omit OpenSSL 'SALTED__' and salt from display in page
    this.cipherText = this.cipherObject.ciphertext;

    this.updateDecryptedText();
  }

  updateDecryptedText() {
    this.modifyCipherObject();

    this.decryptedText = Number.parseInt(CryptoJS.AES.decrypt(this.cipherObject, this.key, this.cipherParams), 16).toString();
  }

  modifyCipherObject() {
    // Construct mask
    let mask = 0;
    for (const checkbox of this.transformMask) {
      // Have to construct bitwise mask in base 10
      if (checkbox.checked === true) {
        mask += checkbox.value;
      }
    }

    // tslint:disable:no-bitwise
    let original = this.cipherObject.ciphertext.words[0];
    let selected = original & mask;
    selected = ~selected & mask;
    original = original & (~mask);
    this.cipherObject.ciphertext.words[0] = original | selected;
    // tslint:enable:no-bitwise
  }
}
