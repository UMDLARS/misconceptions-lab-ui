import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class LabQuizComponent implements OnInit {
  quizGroup: FormGroup;
  questions: LabQuizQuestion[];


  constructor() {
    this.quizGroup = new FormGroup({});
    this.questions = [{prompt: 'aaaaaa', options: ['111', '221', '331'], answer: 1}, {
      prompt: 'bbbbb',
      options: ['112', '222', '332'],
      answer: 0
    }];

    for (const question of this.questions) {
      this.quizGroup.addControl(question.prompt, new FormControl());
    }
  }

  ngOnInit() {
  }

  grade() {
    console.log(this.quizGroup.value);
    for (const question of this.questions) {
      if (this.quizGroup.value[question.prompt] === question.answer) {
        alert('Correct');
      } else {
        alert('Try Again');
      }
    }
  }

}

export class LabQuizQuestion {
  prompt: string;
  options: string[];
  answer: number;
}
