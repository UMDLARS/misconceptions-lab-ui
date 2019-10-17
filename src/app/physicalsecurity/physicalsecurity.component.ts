import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'app-physicalsecurity',
  templateUrl: './physicalsecurity.component.html',
  styleUrls: ['./physicalsecurity.component.css'],
})
export class PhysicalsecurityComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    $('nb-icon').contents().filter(function() { return this.nodeType != 1; }).remove();

    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

}
