import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-trust-users',
  templateUrl: './trust-users.component.html',
  styleUrls: ['./trust-users.component.css']
})
export class TrustUsersComponent implements OnInit {
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
