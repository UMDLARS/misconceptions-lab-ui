import {Component, OnInit, Input} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class LabQuizComponent implements OnInit {
  quizGroup: FormGroup;
  @Input() questions; /*: LabQuizQuestion[];*/

  constructor() {
    this.quizGroup = new FormGroup({});
    // this.questions = [
    //   {prompt: 'First Q', options: ['a', 'b', 'c'], answer: '0', result: ' '},
    //   {prompt: 'Second Q', options: ['d', 'e', 'f'], answer: '1', result: ' '}
    // ];
  }

  ngOnInit() {
    for (const question of this.questions) {
      this.quizGroup.addControl(question.prompt, new FormControl());
    }
  }

  grade() {
    for (const question of this.questions) {
      console.log(this.quizGroup.value[question.prompt]);
      if (this.quizGroup.value[question.prompt] === question.answer) {
        question.result = 'Correct';
      } else {
        question.result = 'Try Again';
      }
    }
  }

}

export class LabQuizQuestion {
  prompt: string;
  options: string[];
  answer: string;
  result: string;
}
