import {Component, OnInit} from '@angular/core';

declare function generate_circuits(): any;
declare function start_sim(): any;
declare function stop_sim(): any;
declare function show_hints(): any;
declare function test(): any;
declare function Log_Node1(): any;
declare function Log_Node2(): any;
declare function init(): any;
declare function nodecheck(): any;

@Component({
  selector: 'app-completelyanonymous',
  templateUrl: './completelyanonymous.component.html',
  styleUrls: ['./completelyanonymous.component.css']
})
export class CompletelyanonymousComponent implements OnInit {

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
    init();
  }

}
