import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trust-users',
  templateUrl: './trust-users.component.html',
  styleUrls: ['./trust-users.component.css']
})
export class TrustUsersComponent implements OnInit {
  message = 'I don’t have to assign separate privilege levels because I can trust users to only do what they’re supposed to.';
  constructor() { }

  ngOnInit() {
  }

}
