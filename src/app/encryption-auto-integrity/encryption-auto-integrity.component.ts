import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encryption-auto-integrity',
  templateUrl: './encryption-auto-integrity.component.html',
  styleUrls: ['./encryption-auto-integrity.component.css']
})
export class EncryptionAutoIntegrityComponent implements OnInit {

  message = 'Encryption automatically provides integrity and/or authenticity.';

  constructor() { }

  ngOnInit() {
  }

}
