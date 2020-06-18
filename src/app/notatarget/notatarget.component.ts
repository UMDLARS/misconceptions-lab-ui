import {Component, OnInit} from '@angular/core';
import {fib, dist} from 'cpu-benchmark';
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
  public welcomeScreen = true;
  public device;
  public operation;
  public target;
  public chartData: any[];
  public specs = {
    laptop: 3,
    smartphone: 1,
    iot: 0.5
  };
  // public chartOption: EChartOption = {
  //   xAxis: {
  //     type: 'category',
  //     data: ['1', '2', '3', '4', '5', '6', '7'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: [0, 0, 0, 0, 0, 0, 0],
  //       type: 'line',
  //     },
  //   ],
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

    // Server: SQ-WEBCAM
  }

  /**
   * Get number of devices associated with a query.
   * This function will not consume credits with Shodan. Please avoid
   * modifying it.  Carson doesn't want to be charged.
   *
   * @param query A string that is a meaningful query through shodan.io
   * @param facets Not sure how to use this yet... leave blank
   */
  async getHostsCount(query: string, facets: string) {
    const tmpUrl = this.apiUrl + '/shodan/host/count' + '?key=' + this.apiKey
    + '&query=' + query + '+country%3A\"US\"' + '&facets=' + facets;
    this.http.get(tmpUrl, {}).subscribe((res) => {
      console.log(res);
    });
  }
  ngOnInit() {
    // console.log('41st Fibonacci number: ');
    // console.log(fib(41));
    this.calculate();
  }

  public calculate() {
    this.chartData = [];
    for (let i = 0; i < 7; i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }

  public updateOption() {
    this.calculate();
  }

  public begin() {
    this.welcomeScreen = !this.welcomeScreen;
  }
}
