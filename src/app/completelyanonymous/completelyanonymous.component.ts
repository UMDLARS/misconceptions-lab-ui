import { Component, OnInit } from '@angular/core';

declare function generate_circuits(): any;
declare function start_sim(): any;
declare function stop_sim(): any;
declare function show_hints(): any;
declare function test(): any;
declare function Log_Node1(): any;
declare function Log_Node2(): any;
declare function init(): any;

@Component({
  selector: 'app-completelyanonymous',
  templateUrl: './completelyanonymous.component.html',
  styleUrls: ['./completelyanonymous.component.css']
})
export class CompletelyanonymousComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init();
  }

}
