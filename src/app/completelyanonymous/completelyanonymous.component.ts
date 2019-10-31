import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

declare function generate_circuits(): any;
declare function start_sim(): any;
declare function stop_sim(): any;
declare function show_hints(): any;
declare function test(): any;
declare function Log_Node1(): any;
declare function Log_Node2(): any;
declare function init(): any;
declare function nodecheck(): any;

@Component({
  selector: 'app-completelyanonymous',
  templateUrl: './completelyanonymous.component.html',
  styleUrls: ['./completelyanonymous.component.css']
})
export class CompletelyanonymousComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init();
    // tslint:disable-next-line:triple-equals
    $('nb-icon').contents().filter(function() { return this.nodeType != 1; }).remove();
  }

}
