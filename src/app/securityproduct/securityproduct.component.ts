import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-securityproduct',
  templateUrl: './securityproduct.component.html',
  styleUrls: ['./securityproduct.component.css']
})
export class SecurityproductComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    $('nb-icon').contents().filter(function() { return this.nodeType != 1; }).remove();
  }

}
