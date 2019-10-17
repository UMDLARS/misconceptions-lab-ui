import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-trust-users',
  templateUrl: './trust-users.component.html',
  styleUrls: ['./trust-users.component.css']
})
export class TrustUsersComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    $('nb-icon').contents().filter(function() { return this.nodeType != 1; }).remove();
  }

}
