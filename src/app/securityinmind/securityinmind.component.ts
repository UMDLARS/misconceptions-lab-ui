import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-securityinmind',
  templateUrl: './securityinmind.component.html',
  styleUrls: ['./securityinmind.component.css']
})
export class SecurityinmindComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    $('nb-icon').contents().filter(function() { return this.nodeType != 1; }).remove();
  }

}
