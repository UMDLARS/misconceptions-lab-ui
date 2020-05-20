import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-privacy-not-important',
  templateUrl: './privacy-not-important.component.html',
  styleUrls: ['./privacy-not-important.component.css']
})
export class PrivacyNotImportantComponent implements OnInit {

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
