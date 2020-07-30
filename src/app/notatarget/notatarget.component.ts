import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Exchange} from './exchanges';
import {MiningStats} from './miningstats';
import {NbDialogService} from '@nebular/theme';
import {DeviceTestComponent} from './device-test/device-test.component';

// https://github.com/fvdm/speedtest/blob/master/index.html for bandwidth
// https://www.cryptocompare.com/mining/calculator/ for mining calculations

// API key for shodan.io: pohejcwyL1yLuY6wunOkbEaEjhLZM5fw
// A lot of this code is going to be stolen from github.com/PaulSec/Shodan.io-mobile-app
// DDoS numbers from https://blog.cloudflare.com/inside-mirai-the-infamous-iot-botnet-a-retrospective-analysis/

@Component({
  selector: 'app-notatarget',
  templateUrl: './notatarget.component.html',
  styleUrls: ['./notatarget.component.css']
})
export class NotatargetComponent implements OnInit {
  public questions;
  private shodanUrl = 'https://api.shodan.io';
  /* THIS IS CARSON'S API KEY. PLEASE DON'T ABUSE IT BECAUSE
   * I DON'T WANT TO LOSE ACCESS.
   */
  private apiKey = 'pohejcwyL1yLuY6wunOkbEaEjhLZM5fw';
  public welcomeScreen = true;
  public device: string;
  public operation: string;
  public bandwidth = 0;
  public target: string;
  public showAmplify = false;
  public amplified = 1;
  public chartData: number;
  public realDevices = 0;
  public shodanMsg: string;
  public hashrates = {
    laptop: 1250000,
    smartphone: 30000,
    iot: 15000,
    yourDevice: 0
  };
  public yourBandwidth = 0;
  public cryptos = {
    BTC: {
      exchangeRate: 9000,
      difficulty: 0
    },
    ETH: {
      exchangeRate: 0,
      networkHashRate: 0,
      blockTime: 0
    },
    XMR: {
      exchangeRate: 0,
      networkHashRate: 0,
      blockTime: 0
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
    this.http.get(tmpUrl, {}).subscribe((res: {matches: any[], total: number}) => {
      console.log(res);
      this.realDevices = res.total;
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
        break;
      case 'monero':
      case 'xmr':
        // Daily mining estimate = ( (your hashrate) * (current block reward) * 720 ) / (network hashrate)
        yearlyGenerated = this.hashrates[hashrate] * 31536000 / this.cryptos.XMR.networkHashRate / this.cryptos.XMR.blockTime;
        yearlyGenerated *= this.cryptos.XMR.exchangeRate;
        break;
      case 'ethereum':
      case 'eth':
        // based on block reward of 3:
        yearlyGenerated = 94608000 * this.hashrates[hashrate] / this.cryptos.ETH.networkHashRate / this.cryptos.ETH.blockTime;
        yearlyGenerated *= this.cryptos.ETH.exchangeRate;
        break;
      default:
        console.error('Error: getProfitCalc received invalid cryptocurrency');
        return;
    }
    this.chartData = yearlyGenerated;
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
      this.cryptos.ETH.networkHashRate = Number(res.nodes[0].networkhashps);
      this.cryptos.ETH.blockTime = Number(res.nodes[0].avgBlockTime);
    });
    this.http.get('https://xmr.2miners.com/api/stats', {}).subscribe((res: MiningStats) => {
      // console.log(res.nodes[0].difficulty);
      this.cryptos.XMR.networkHashRate = Number(res.nodes[0].networkhashps);
      this.cryptos.XMR.blockTime = Number(res.nodes[0].avgBlockTime);
    });
    this.http.get('https://blockchain.info/q/getdifficulty', {}).subscribe((res: number) => {
      // console.log(res);
      this.cryptos.BTC.difficulty = res;
    });
  }

  public getAttackMagnitude() {
    if (this.bandwidth <= 0) { // then yourDevice is selected
      if (this.yourBandwidth <= 0) {
        this.openDialog();
        if (this.yourBandwidth <= 0) { return; }
      }
      this.bandwidth = this.yourBandwidth;
    }
    console.log(this.bandwidth);
    this.chartData = this.amplified * this.bandwidth;
    this.showAmplify = true;
  }

  ngOnInit() {
    // get real exchange rates
    this.getExchangeRates();
    this.getMiningStats();
    // console.log('41st Fibonacci number: ');
    // console.log(fib(41));
  }

  public updateOption() {
    this.getHostsCount('"default+password"', '');
    this.displayMsg();
    if (this.operation === 'crypto') {
      this.getProfitCalc(this.target, this.device);
    } else {
      this.getAttackMagnitude();
    }
    // console.log(this.chartData);
  }

  public begin() {
    this.welcomeScreen = !this.welcomeScreen;
  }

  // opens a dialog that runs yourDevice tests
  openDialog() {
    this.dialogService.open(DeviceTestComponent).onClose.subscribe(res => {
      this.hashrates.yourDevice = res[0];
      this.yourBandwidth = res[1];
    });
  }

  // Controls message that shows up below line chart
  public displayMsg() {
    // this probably shouldn't happen if shodan is down or otherwise doesn't provide meaningful numbers
    this.shodanMsg = 'Shodan found ' + this.realDevices + ' potentially vulnerable devices.';
    // 'An attack with these devices would be larger than '
    // + attackName + '!'
  }
}
