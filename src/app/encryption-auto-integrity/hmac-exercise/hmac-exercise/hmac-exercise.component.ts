import {Component, OnInit} from '@angular/core';
import AES from 'crypto-js/aes';

@Component({
  selector: 'app-hmac-exercise',
  templateUrl: './hmac-exercise.component.html',
  styleUrls: ['./hmac-exercise.component.css']
})
export class HmacExerciseComponent implements OnInit {

  plaintext = '';
  ciphertext = '';

  constructor() {
  }

  ngOnInit() {
  }

  updateCiphertext() {
    this.ciphertext = AES.encrypt(this.plaintext, 'Bakebot is the best').toString();
  }

}
