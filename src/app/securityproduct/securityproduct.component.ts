import {Component, OnInit} from '@angular/core';
import {LabQuizQuestion} from '../layout/lab-check/quiz/quiz.component';


@Component({
  selector: 'app-securityproduct',
  templateUrl: './securityproduct.component.html',
  styleUrls: ['./securityproduct.component.css']
})
export class SecurityproductComponent implements OnInit {
  public questions; /*: LabQuizQuestion[];*/

  /*public questions: Array<{ text: string, answer: number, choices: Array<{choiceId: number, choiceText: string}> }>*/
  constructor() {

    this.questions =[
      {prompt: 'First Q', options: ['a', 'b', 'c'], answer: '0', result: ' '},
      {prompt: 'Second Q', options: ['d', 'e', 'f'], answer: '1', result: ' '}
      ];
    console.log(this.questions);
    /*[
      {prompt: 'First Q', options: ['a', 'b', 'c'], answer: '0', result: ' '},
      {prompt: 'Second Q', options: ['d', 'e', 'f'], answer: '1', result: ' '}
    ];*/
  }

  ngOnInit() {
    /*console.log(this.questions);*/
  }

}


