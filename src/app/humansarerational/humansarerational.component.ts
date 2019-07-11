import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-humansarerational',
  templateUrl: './humansarerational.component.html',
  styleUrls: ['./humansarerational.component.css']
})
export class HumansarerationalComponent implements OnInit {

  message = 'Humans are rational agents who understand security and can’t be tricked.';

  constructor() { }

  ngOnInit() {
  }

}
