import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-not-important',
  templateUrl: './privacy-not-important.component.html',
  styleUrls: ['./privacy-not-important.component.css']
})
export class PrivacyNotImportantComponent implements OnInit {
  message = 'I have nothing to hide, so privacy isn’t important to me.';
  constructor() { }

  ngOnInit() {
  }

}
