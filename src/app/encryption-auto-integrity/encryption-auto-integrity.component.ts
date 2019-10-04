import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-encryption-auto-integrity',
  templateUrl: './encryption-auto-integrity.component.html',
  styleUrls: ['./encryption-auto-integrity.component.css']
})
export class EncryptionAutoIntegrityComponent implements OnInit {

  message = 'Encryption automatically provides integrity and/or authenticity.';

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    $('nb-icon').contents().filter(function() { return this.nodeType != 1; }).remove();
  }

}
