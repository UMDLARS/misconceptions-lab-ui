import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-defense-in-depth',
  templateUrl: './defense-in-depth.component.html',
  styleUrls: ['./defense-in-depth.component.css']
})
export class DefenseInDepthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    $('nb-icon').contents().filter(function() { return this.nodeType != 1; }).remove();
  }

}
