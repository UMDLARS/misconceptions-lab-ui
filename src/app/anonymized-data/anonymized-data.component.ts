import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anonymized-data',
  templateUrl: './anonymized-data.component.html',
  styleUrls: ['./anonymized-data.component.css']
})
export class AnonymizedDataComponent implements OnInit {

  message = 'Anonymized data can’t leak sensitive information.';

  constructor() { }

  ngOnInit() {
  }

}
