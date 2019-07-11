import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-securityinmind',
  templateUrl: './securityinmind.component.html',
  styleUrls: ['./securityinmind.component.css']
})
export class SecurityinmindComponent implements OnInit {
  message = 'The software I use is secure, since the developers designed it with security in mind.';
  constructor() { }

  ngOnInit() {
  }

}
