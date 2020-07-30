import {Component, OnInit} from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-hmac-exercise',
  templateUrl: './hmac-exercise.component.html',
  styleUrls: ['./hmac-exercise.component.css']
})
export class HmacExerciseComponent implements OnInit {

  // For some reason without explicit parsing of Key and IV
  // CryptoJS doesn't produce the same ciphertext between reloads
  key = CryptoJS.enc.Utf8.parse('Bakebot is the best');
  hmacSecret = CryptoJS.enc.Utf8.parse('Super Secret');
  cipherObject: any;
  cipherParams = {
    iv: CryptoJS.enc.Utf8.parse('Bakebot'),
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding
  };

  plainText = 20;
  binaryCipherText = '';
  originalHmac = '';
  hmacValid = true;
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
    this.originalHmac = CryptoJS.HmacSHA256(this.cipherObject.ciphertext, this.hmacSecret).toString();

    this.updateDecryptedText();
  }

  updateDecryptedText() {
    this.modifyCipherObject();

    this.binaryCipherText = Number.parseInt(this.cipherObject.ciphertext, 16).toString(2).padStart(32, '0');

    this.decryptedText = Number.parseInt(CryptoJS.AES.decrypt(this.cipherObject, this.key, this.cipherParams), 16).toString();
    this.hmacValid = CryptoJS.HmacSHA256(this.cipherObject.ciphertext, this.hmacSecret).toString() === this.originalHmac;
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

    const original = this.cipherObject.ciphertext.words[0];
    // tslint:disable-next-line:no-bitwise
    this.cipherObject.ciphertext.words[0] = original ^ mask;
  }

  checkboxChanged(index: number) {
    this.transformMask[index].checked = !this.transformMask[index].checked;

    this.updateCipherText();
  }
}
