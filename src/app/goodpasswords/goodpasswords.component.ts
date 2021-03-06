import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-goodpasswords',
  templateUrl: './goodpasswords.component.html',
  styleUrls: ['./goodpasswords.component.css']
})
export class GoodpasswordsComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  public questions;

  constructor(private fb: FormBuilder) {
      this.questions = [

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
