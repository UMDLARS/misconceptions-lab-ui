import {Component, OnInit} from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-humansarerational',
  templateUrl: './humansarerational.component.html',
  styleUrls: ['./humansarerational.component.css']
})
export class HumansarerationalComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    $('nb-icon').contents().filter(function() { return this.nodeType != 1; }).remove();
  }

}
