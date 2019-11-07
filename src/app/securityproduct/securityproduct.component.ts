import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-securityproduct',
  templateUrl: './securityproduct.component.html',
  styleUrls: ['./securityproduct.component.css']
})
export class SecurityproductComponent implements OnInit {

  public questions: Array<{ text: string, answer: number, choices: Array<{choiceId: number, choiceText: string}> }>
  constructor() {
  }

  ngOnInit() {

  }

}
