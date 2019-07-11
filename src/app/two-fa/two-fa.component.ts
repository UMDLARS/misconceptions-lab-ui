import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.css']
})
export class TwoFAComponent implements OnInit {
  message = 'The inconvenience of Two Factor Authentication outweighs its security benefits.';
  constructor() { }

  ngOnInit() {
  }

}
