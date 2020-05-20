import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Docker {
  url: string;
  container: string;
}

@Component({
  selector: 'app-notatarget',
  templateUrl: './notatarget.component.html',
  styleUrls: ['./notatarget.component.css']
})
export class NotatargetComponent implements OnInit, OnDestroy {
  thisdocker: Docker;
  thisurl: string;
  thirdForm: any;
  secondForm: any;
  firstForm: any;
  ifrm: any;
  thiscontainer: any;
  public questions;

  constructor(private  http: HttpClient) {
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

    // const url = 'http://10.1.1.12:5000';
    // this.http.get(url).subscribe(
    //   data => this.doSomething(data)
    // );
  }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    // console.log('AAAAAAHHHHH');
    // this.http.post('http://10.1.1.12:5000/destroy',
    //   {
    //     container:  this.thiscontainer
    //   })
    //   .subscribe(
    //     data  => {
    //       console.log('POST Request is successful ', data);
    //     },
    //     error  => {
    //
    //       console.log('Error', error);
    //
    //     }
    //
    //   );
  }

  // doSomething(data) {
  //   this.thisdocker = data;
  //   this.thisurl = data.url;
  //   this.ifrm = document.createElement('iframe');
  //   this.ifrm.setAttribute('id', 'ifrm');
  //   this.ifrm.setAttribute('src', this.thisurl);
  //   this.ifrm.setAttribute('height', '1000px');
  //   this.ifrm.setAttribute('width', '100%');
  //   this.ifrm.setAttribute('style', 'border:none;');
  //   let el = document.getElementById('vm');
  //   el.parentNode.append(this.ifrm);
  //   this.thiscontainer = data.container;
  // }

  onThirdSubmit() {
  }

  onSecondSubmit() {

  }

  onFirstSubmit() {

  }
}
