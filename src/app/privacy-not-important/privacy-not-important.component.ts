import {Component, OnInit} from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-privacy-not-important',
  templateUrl: './privacy-not-important.component.html',
  styleUrls: ['./privacy-not-important.component.css']
})
export class PrivacyNotImportantComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    $('nb-icon').contents().filter(function() { return this.nodeType != 1; }).remove();
  }

}
