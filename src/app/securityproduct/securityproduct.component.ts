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

      {prompt: '1) Which one of these vulnerabilities does your security product protet you from without fail?',
        options: ['Denial of Service on the 2.2 kernel.', 'Heap overflow in WebConfig in Mdaemon 3.1.1.',
          'Buffer overflow in PAM SMB module.', 'Your product cannot protect you from any of these without failure.'],
        answer: '3',
        result: ' '},
      {prompt: '2) You installed a top of the line firewall on your computer that comes with 24/7 chat support, deep packet inspection, and' +
          'adaptive machine learning-based protection. How does this product make it safe for you to download and open arbitrary email ' +
          'attachments',
        options: ['The security product decreases my attack surface.', 'The product protects me from all classes of attack.',
          'This product makes up for my lack of knowledge in security.',
          'This product protects me automatically not require me to contribute to my safety.',
          'The security product is not foolproof and therefore requires your caution towards vulnerabilities.'],
        answer: '4',
        result: ' '}
      ];

    /*[
      {prompt: 'First Q', options: ['a', 'b', 'c'], answer: '0', result: ' '},
      {prompt: 'Second Q', options: ['d', 'e', 'f'], answer: '1', result: ' '}
    ];*/
  }

  ngOnInit() {
    /**/
  }

}


