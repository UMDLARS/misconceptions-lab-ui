import {Component, OnInit} from '@angular/core';
import * as sha256 from 'crypto-js/sha256';
import {HttpClient} from '@angular/common/http';
import {Exchange} from './exchanges';
import {MiningStats} from './miningstats';
import {NbDialogService} from '@nebular/theme';
import {DialogPromptComponent} from './dialog/dialog-prompt';

// https://github.com/fvdm/speedtest/blob/master/index.html for bandwidth
// https://www.cryptocompare.com/mining/calculator/ for mining calculations

// API key for shodan.io: pohejcwyL1yLuY6wunOkbEaEjhLZM5fw
// A lot of this code is going to be stolen from github.com/PaulSec/Shodan.io-mobile-app

@Component({
  selector: 'app-notatarget',
  templateUrl: './notatarget.component.html',
  styleUrls: ['./notatarget.component.css']
})
export class NotatargetComponent implements OnInit {
  public questions;
  // private cryptoUrl = 'https://www.coincalculators.io/api';
  private shodanUrl = 'https://api.shodan.io';
  /* THIS IS CARSON'S API KEY. PLEASE DON'T ABUSE IT BECAUSE
   * I DON'T WANT TO LOSE ACCESS.
   */
  private apiKey = 'pohejcwyL1yLuY6wunOkbEaEjhLZM5fw';
  public welcomeScreen = true;
  public device: string;
  public operation: string;
  public target: string;
  public chartData: number;
  public hashrates = {
    laptop: 50000,
    smartphone: 30000,
    iot: 15000,
    yourDevice: 0
  };
  public bandwidth = 0;
  public cryptos = {
    BTC: {
      exchangeRate: 9000,
      difficulty: 0,
      yearlyProfit: 0
    },
    ETH: {
      exchangeRate: 0,
      difficulty: 0,
      yearlyProfit: 0
    },
    XMR: {
      exchangeRate: 0,
      networkHashRate: 0,
      blockReward: 0,
      yearlyProfit: 0
    }
  };

  constructor(private http: HttpClient, private dialogService: NbDialogService) {
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
   * Calculates yearly profit in USD
   * @param currency The cryptocurrency to be mined
   * @param hashrate The number of hashes per sec of all combined devices
   */
  public getProfitCalc(currency: string, hashrate: string) {

    if (hashrate === 'yourDevice' && this.hashrates.yourDevice === 0) {
      this.openDialog();
      if (this.hashrates.yourDevice === 0) { return; }
    }
    let yearlyGenerated: number;
    switch (currency.toLowerCase()) {
      case 'bitcoin':
      case 'btc':
        // this.cryptos.BTC.dailyProfit = 86400 * Number(hashrate) / this.cryptos.BTC.difficulty / Math.pow(2, 32);
        // below is a simplified form of the above equation:
        yearlyGenerated = 246375 * this.hashrates[hashrate] / this.cryptos.BTC.difficulty / Math.pow(2, 25);
        yearlyGenerated *= this.cryptos.BTC.exchangeRate;
        // return this.cryptos.BTC.yearlyProfit;
        break;
      case 'monero':
      case 'xmr':
        // Daily mining estimate = ( (your hashrate) * (current block reward) * 720 ) / (network hashrate)
        yearlyGenerated = this.hashrates[hashrate] * this.cryptos.XMR.blockReward * 720 / this.cryptos.XMR.networkHashRate;
        yearlyGenerated *= this.cryptos.XMR.exchangeRate;
        // return this.cryptos.XMR.yearlyProfit;
        break;
      case 'ethereum':
      case 'eth':
        yearlyGenerated = 3e17 * this.hashrates[hashrate] / this.cryptos.ETH.difficulty;
        yearlyGenerated *= this.cryptos.ETH.exchangeRate;
        // return this.cryptos.ETH.yearlyProfit;
        break;
      default:
        console.error('Error: getProfitCalc received invalid cryptocurrency');
        return;
    }
    this.chartData = yearlyGenerated;
    // this.calculate(yearlyGenerated);
  }

  /**
   * Uses Cryptocompare API to get exchange rates for bitcoin, monero, and ethereum.
   * Can easily be modified to get other exchange rates if we want.
   */
  async getExchangeRates() {
    this.http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD',
      {}).subscribe((res: Exchange) => {
      this.cryptos.BTC.exchangeRate = res.USD;
    });
    this.http.get('https://min-api.cryptocompare.com/data/price?fsym=XMR&tsyms=USD',
      {}).subscribe((res: Exchange) => {
      this.cryptos.XMR.exchangeRate = res.USD;
    });
    this.http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
      {}).subscribe((res: Exchange) => {
      this.cryptos.ETH.exchangeRate = res.USD;
    });
  }

  /**
   * Retrieves info about cryptos to be used in mining calculations.
   * For now, we only need to keep the network difficulty.
   */
  async getMiningStats() {
    this.http.get('https://eth.2miners.com/api/stats', {}).subscribe((res: MiningStats) => {
      // console.log(res.nodes[0].difficulty);
      this.cryptos.ETH.difficulty = res.nodes[0].difficulty;
    });
    this.http.get('https://xmr.2miners.com/api/stats', {}).subscribe((res: MiningStats) => {
      // console.log(res.nodes[0].difficulty);
      this.cryptos.XMR.networkHashRate = res.nodes[0].networkhashps;
      this.cryptos.XMR.blockReward = res.nodes[0].blockReward;
    });
    this.http.get('https://blockchain.info/q/getdifficulty', {}).subscribe((res: number) => {
      // console.log(res);
      this.cryptos.BTC.difficulty = res;
    });
  }

  ngOnInit() {
    // get real exchange rates
    this.getExchangeRates();
    this.getMiningStats();
    // console.log('41st Fibonacci number: ');
    // console.log(fib(41));
    // this.calculate();
    // this.getProfitCalc('bitcoin', '40000000');
  }

  // calculate() has moved to line-chart.component
  // public calculate(yearlyGeneratedUSD: number) {
  //   this.chartData = [];
  //   for (let i = 0; i < 7; i++) {
  //     this.chartData.push([
  //       `Index ${i}`,
  //       yearlyGeneratedUSD * i
  //     ]);
  //   }
  // }

  public updateOption() {
    this.getProfitCalc(this.target, this.device);
    // console.log(this.chartData);
  }

  public begin() {
    this.welcomeScreen = !this.welcomeScreen;
  }

  // opens a dialog that prompts the user whether to run yourDevice tests
  openDialog() {
    this.dialogService.open(DialogPromptComponent).onClose.subscribe(res => {
      res[0] = this.hashrates.yourDevice;
      res[1] = this.bandwidth;
    });
  }
  // runTests() {
  //   this.hashTest(10000); // 10000 millisecs is rather arbitrary...
  //   this.bandwidthTest();
  // }
  //
  // bandwidthTest() {}
  //
  // public hashTest(timeLimit) {
  //   let digest = sha256('pohejcwyL1yLuY6wunOkbEaEjhLZM5fw');
  //   const start = new Date().getTime();
  //   let hashes = 0;
  //   let curTime = new Date().getTime();
  //   while (curTime < start + timeLimit) {
  //     digest = sha256(digest);
  //     hashes++;
  //     curTime = new Date().getTime();
  //   }
  //   this.hashrates.yourDevice = hashes / 1000; // yields hashes per second
  //   console.log('Total hashes performed in ' + timeLimit + ' millisecs: ' + hashes);
  // }
}
