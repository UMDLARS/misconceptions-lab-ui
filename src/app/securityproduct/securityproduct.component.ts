import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-securityproduct',
  templateUrl: './securityproduct.component.html',
  styleUrls: ['./securityproduct.component.css']
})
export class SecurityproductComponent implements OnInit {
  message = 'Having security product X makes me secure.';
  constructor() { }

  ngOnInit() {
  }

}
