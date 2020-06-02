import {Component, OnInit} from '@angular/core';
import {fib, dist} from 'cpu-benchmark';
// import {shodan-client} from 'shodan-client';
import {HttpClient} from '@angular/common/http';

// https://github.com/fvdm/speedtest/blob/master/index.html for bandwidth

// API key for shodan.io: pohejcwyL1yLuY6wunOkbEaEjhLZM5fw
// A lot of this code is going to be stolen from github.com/PaulSec/Shodan.io-mobile-app

@Component({
  selector: 'app-notatarget',
  templateUrl: './notatarget.component.html',
  styleUrls: ['./notatarget.component.css']
})
export class NotatargetComponent implements OnInit {
  public questions;
  private apiUrl = 'https://api.shodan.io';
  /* THIS IS CARSON'S API KEY. PLEASE DON'T ABUSE IT BECAUSE
   * I DON'T WANT TO LOSE ACCESS.
   */
  private apiKey = 'pohejcwyL1yLuY6wunOkbEaEjhLZM5fw';
  // private searchOps = {
  //   facets: 'country:100'
  // };

  constructor(private http: HttpClient) {
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

  async getHostsCount(query: string, facets: string) {
    const tmpUrl = this.apiUrl + '/shodan/host/count' + '?key=' + this.apiKey
    + '&query=' + query + '+country%3A\"US\"' + '&facets=' + facets;
    this.http.get(tmpUrl, {}).subscribe((res) => {
      console.log(res);
    });
  }
  ngOnInit() {
    //console.log('41st Fibonacci number: ');
    //console.log(fib(41));
  }
}
