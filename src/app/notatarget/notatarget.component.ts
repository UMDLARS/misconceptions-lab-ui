import {Component, OnInit} from '@angular/core';
import * as sha256 from 'crypto-js/sha256';
import {HttpClient} from '@angular/common/http';
import {Exchanges} from './exchanges';

// https://github.com/fvdm/speedtest/blob/master/index.html for bandwidth
// https://www.cryptocompare.com/mining/calculator/ for mining calculations
// BETTER: https://www.coincalculators.io/api

// API key for shodan.io: pohejcwyL1yLuY6wunOkbEaEjhLZM5fw
// A lot of this code is going to be stolen from github.com/PaulSec/Shodan.io-mobile-app

@Component({
  selector: 'app-notatarget',
  templateUrl: './notatarget.component.html',
  styleUrls: ['./notatarget.component.css']
})
export class NotatargetComponent implements OnInit {
  public questions;
  private cryptoUrl = 'https://www.coincalculators.io/api';
  private shodanUrl = 'https://api.shodan.io';
  /* THIS IS CARSON'S API KEY. PLEASE DON'T ABUSE IT BECAUSE
   * I DON'T WANT TO LOSE ACCESS.
   */
  private apiKey = 'pohejcwyL1yLuY6wunOkbEaEjhLZM5fw';
  public welcomeScreen = true;
  public device;
  public operation;
  public target;
  public chartData: any[];
  public hashrates = {
    laptop: 50000,
    smartphone: 30000,
    iot: 15000
  };
  public flops = {
    laptop: 3,
    smartphone: 1,
    iot: 0.5
  };
  public exchangeRates = {
    BTC : 9000,
    ETH : 1,
    MON : 1
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
  private profitInYearUSD: any;

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
    const tmpUrl = this.shodanUrl + '/shodan/host/count' + '?key=' + this.apiKey
    + '&query=' + query + '+country%3A\"US\"' + '&facets=' + facets;
    this.http.get(tmpUrl, {}).subscribe((res) => {
      console.log(res);
    });
  }

  /**
   * Calculates daily/monthly/yearly profit
   * @param crypto The cryptocurrency to be mined
   * @param hashrate The number of hashes per sec of all combined devices
   */
  async getProfitCalc(crypto: string, hashrate: string) {
    const url = this.cryptoUrl + '?name=' + crypto + '&hashrate=' + hashrate;
    this.http.get(url, {}).subscribe((res) => {
      console.log(res[this.profitInYearUSD]);
    });
  }

  async getExchangeRates() {
    const url = 'https://api.coinbase.com/v2/exchange-rates?currency=USD';
    // const rates = 'rates';
    const BTC = 'USD';
    this.http.get<Exchanges>(url, {}).subscribe((res) => {
      console.log(res);
      // const {BTC: BTC1} = res.rates.BTC;
      const {BTC: BTC1} = res.data.rates;
      this.exchangeRates.BTC = 1 / (BTC1);
    });
  }

  ngOnInit() {
    // get real exchange rates
    this.getExchangeRates().then(r => this.calculate());
    // console.log('41st Fibonacci number: ');
    // console.log(fib(41));
    // this.calculate();
    this.getProfitCalc('bitcoin', '40000000');
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

  public hashTest(timeLimit) {
    let digest = sha256('pohejcwyL1yLuY6wunOkbEaEjhLZM5fw');
    const start = new Date().getTime();
    let hashes = 0;
    let curTime = new Date().getTime();
    while (curTime < start + timeLimit) {
      digest = sha256(digest);
      hashes++;
      curTime = new Date().getTime();
    }
    console.log('Total hashes performed in ' + timeLimit + ' millisecs: ' + hashes);
  }
}
