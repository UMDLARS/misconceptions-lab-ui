import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-encrapter',
  templateUrl: './encrapter.component.html',
  styleUrls: ['./encrapter.component.css']
})
export class EncrapterComponent implements OnInit {
  plaintext: string;
  ciphertext = '';
  selectedCipher = 'rot13';

  constructor() {
  }

  ngOnInit() {
  }

  updateCiphertext() {
    const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    const index = x => input.indexOf(x);
    const translate = x => index(x) > -1 ? output[index(x)] : x;
    this.ciphertext = this.plaintext.split('').map(translate).join('');
  }
}
