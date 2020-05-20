import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-encryption-auto-integrity',
  templateUrl: './encryption-auto-integrity.component.html',
  styleUrls: ['./encryption-auto-integrity.component.css']
})
export class EncryptionAutoIntegrityComponent implements OnInit {

  message = 'Encryption automatically provides integrity and/or authenticity.';

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

}
