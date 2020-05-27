import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// try using 'cpu-benchmark' in node.js
// https://github.com/fvdm/speedtest/blob/master/index.html for bandwidth

@Component({
  selector: 'app-notatarget',
  templateUrl: './notatarget.component.html',
  styleUrls: ['./notatarget.component.css']
})
export class NotatargetComponent implements OnInit {
  public questions;

  constructor() {
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

  }


  ngOnInit() {
  }
}
