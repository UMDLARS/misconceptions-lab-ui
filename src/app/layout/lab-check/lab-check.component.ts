import {Component, Input, OnInit} from '@angular/core';
import {LabQuizQuestion} from './quiz/quiz.component';

@Component({
  selector: 'app-lab-check',
  templateUrl: './lab-check.component.html',
  styleUrls: ['./lab-check.component.scss']
})
export class LabCheckComponent implements OnInit {
  @Input() questions; /*: LabQuizQuestion[];*/
  constructor() {
  }

  ngOnInit() {
  }

}
