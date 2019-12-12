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
  public questions;
  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer) {

      this.questions =[

        {prompt: '1) Question one?',
          options: [
            'Answer 0.',
            'Answer 1.',
            'Answer 2.',
            'Answer 3.'
          ],
          answer: '3',
          result: ' '},
        {prompt: '2) Question two?',
          options: [
            'Answer 0.',
            'Answer 1.',
            'Answer 2.',
            'Answer 3.'
          ],
          answer: '0',
          result: ' '}
      ];

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
