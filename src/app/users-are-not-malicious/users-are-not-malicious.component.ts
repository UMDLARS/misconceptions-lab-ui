import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-are-not-malicious',
  templateUrl: './users-are-not-malicious.component.html',
  styleUrls: ['./users-are-not-malicious.component.css']
})
export class UsersAreNotMaliciousComponent implements OnInit {

  message = 'I can trust my users to not be malicious.';

  constructor() { }

  ngOnInit() {
  }

}
