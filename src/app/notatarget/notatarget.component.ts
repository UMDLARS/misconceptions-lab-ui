import {Component, OnInit} from '@angular/core';
import {fib, dist} from 'cpu-benchmark';
// import {shodan-client} from 'shodan-client';
import {HttpClient} from '@angular/common/http';
// try using 'cpu-benchmark' in node.js
// https://github.com/fvdm/speedtest/blob/master/index.html for bandwidth

// API key for shodan.io: 90Y9GrTk3GTa4TQyW6XvNdPk3otyRu4B

@Component({
  selector: 'app-notatarget',
  templateUrl: './notatarget.component.html',
  styleUrls: ['./notatarget.component.css']
})
export class NotatargetComponent implements OnInit {
  public questions;
  // private searchOps = {
  //   facets: 'country:100'
  // };

  constructor() {// private http: HttpClient) {
      this.questions = [

        {prompt: '1) Which quality/characteristic of a botnet explains why attacking small machines is so cost efficient?',
          options: [
            'Low maintenance',
            'Automation',
            'Scalability',
            'Vulnerability'
          ],
          answer: '1',
          result: ' '},
        {prompt: '2) All of these practices can mitigate your vulnerability except:',
          options: [
            'Turn your computer off at night',
            'Change default passwords on devices',
            'Keep software up-to-date',
            'Prefer signed software'
          ],
          answer: '0',
          result: ' '}
      ];

    // const url = 'http://10.1.1.12:5000';
    // this.http.get(url).subscribe(
    //   data => this.doSomething(data)
    // );

    // Server: SQ-WEBCAM
  }


  ngOnInit() {
    console.log('41st Fibonacci number: ');
    console.log(fib(41));
  }
}
