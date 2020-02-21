import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-users-are-not-malicious',
  templateUrl: './users-are-not-malicious.component.html',
  styleUrls: ['./users-are-not-malicious.component.css']
})

export class UsersAreNotMaliciousComponent implements OnInit {

  public questions;

  constructor() {
    this.questions = [

      {prompt: '1) Which of the following is an example of invalid input?',
        options: [
          'BAKE AT 350 FOR -60 MINUTES',
          'ADD &=^',
          'Both A and B are invalid',
          'Neither is invalid'
        ],
        answer: '1',
        result: ' '},
      {prompt: '2) Suppose a user enters: BAKE AT 400 FOR 35 MNITUES. What should BakeBot do?',
        options: [
          'Shutdown before the user enters something more dangerous.',
          'Assume the user meant "minutes," so bake for 35 minutes',
          'Show an error message',
          'Any of the above is sufficient.'
        ],
        answer: '2',
        result: ' '}
    ];

  }

  ngOnInit() {
  }
}
