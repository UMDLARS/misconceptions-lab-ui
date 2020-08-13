import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Exchange} from './exchanges';
import {MiningStats} from './miningstats';
import {NbDialogService} from '@nebular/theme';
import {DeviceTestComponent} from './device-test/device-test.component';

// https://www.cryptocompare.com/mining/calculator/ for mining calculations
// DDoS numbers from https://blog.cloudflare.com/inside-mirai-the-infamous-iot-botnet-a-retrospective-analysis/

@Component({
  selector: 'app-notatarget',
  templateUrl: './notatarget.component.html',
  styleUrls: ['./notatarget.component.css']
})
export class NotatargetComponent implements OnInit {
  public questions;
  // private shodanUrl = 'https://api.shodan.io/shodan/host/count';
  /* THIS IS CARSON'S API KEY. PLEASE DON'T ABUSE IT BECAUSE
   * I DON'T WANT TO LOSE ACCESS.
   */
  // private apiKey = '';
  public welcomeScreen = true;
  public introScreen = false;
  public intro2 = false;
  public mainScreen = false;
  public device: string;
  public operation: string;
  public bandwidth = 0;
  public target: string;
  public showAmplify = false;
  public amplified = 1;
  public chartData: number;
  public realDevices = 0;
  // accessed 8/10/2020
  public deviceCounts = {
    defaultPass: 50525,
    webcam: 5904
  };
  public shodanMsg: string;
  public guidance: string;
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
      blockTime: 0,
      difficulty: 1
    },
    XMR: {
      exchangeRate: 0,
      networkHashRate: 0,
      blockTime: 0,
      difficulty: 1
    }
  };
  public activityGuidance = {
    intro: 'Start by selecting an operation, then select the operation\'s parameters',
    afterCrypto: 'The graph below shows how much money you could make with the given parameters.',
    afterDDoS: 'The graph below shows the attack volume you could generate with the given parameters. '
    + 'The red lines indicate the size of historical attacks. Click on them to learn more about a particular attack.'
  };
  private moneyFormatter; // used to make currency numbers look normal

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
      this.moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
  }

  ngOnInit() {
    // get real exchange rates
    this.getExchangeRates();
    this.getMiningStats();
    this.guidance = this.activityGuidance.intro;
    // console.log('41st Fibonacci number: ');
    // console.log(fib(41));
  }

  /**
   * Get number of devices associated with a query.
   * This function will not consume credits with Shodan. Please avoid
   * modifying it.  Carson doesn't want to be charged.
   *
   * @param query A string that is a meaningful query through shodan.io
   */
  getHostsCount(query: string) {
    // const tmpUrl = this.shodanUrl + '?key=' + this.apiKey + '&query=' + query;
    // await this.http.get(tmpUrl, {}).subscribe((res: {matches: any[], total: number}) => {
    //   // console.log(res);
    //   this.realDevices = res.total;
    // });
  }
  /**
   * Calculates yearly profit in USD
   * @param currency The cryptocurrency to be mined
   * @param hashrate The number of hashes per sec of all combined devices
   */
  public getProfitCalc(currency: string, hashrate: string) {

    if (hashrate === 'yourDevice' && this.hashrates.yourDevice === 0) {
      this.promptDeviceTest();
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
        yearlyGenerated = this.hashrates[hashrate] * 31536000 / this.cryptos.XMR.difficulty;
        yearlyGenerated *= this.cryptos.XMR.exchangeRate;
        console.log(this.cryptos.XMR);
        break;
      case 'ethereum':
      case 'eth':
        // based on block reward of 3:
        yearlyGenerated = 94608000 * this.hashrates[hashrate] / this.cryptos.ETH.difficulty;
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
      this.cryptos.ETH.difficulty = Number(res.nodes[0].difficulty);
    });
    this.http.get('https://xmr.2miners.com/api/stats', {}).subscribe((res: MiningStats) => {
      // console.log(res.nodes[0].difficulty);
      this.cryptos.XMR.networkHashRate = Number(res.nodes[0].networkhashps);
      this.cryptos.XMR.blockTime = Number(res.nodes[0].avgBlockTime);
      this.cryptos.XMR.difficulty = Number(res.nodes[0].difficulty);
    });
    this.http.get('https://blockchain.info/q/getdifficulty', {}).subscribe((res: number) => {
      // console.log(res);
      this.cryptos.BTC.difficulty = res;
    });
  }

  public getAttackMagnitude() {
    if (this.bandwidth <= 0) { // then yourDevice is selected
      if (this.yourBandwidth <= 0) {
        this.promptDeviceTest();
        if (this.yourBandwidth <= 0) { return; }
      }
      this.bandwidth = this.yourBandwidth;
    }
    console.log('This bandwidth is: ' + this.bandwidth);
    this.chartData = this.amplified * this.bandwidth;
    this.showAmplify = true;
  }

  public updateGraph() {
    // this.getHostsCount('"default+password"');
    // in lieu of a real shodan query:
    this.realDevices = this.deviceCounts.defaultPass;
    if (this.operation === 'crypto') {
      this.getProfitCalc(this.target, this.device);
      this.guidance = this.activityGuidance.afterCrypto;
    } else {
      this.getAttackMagnitude();
      this.guidance = this.activityGuidance.afterDDoS;
    }
    this.displayMsg();
    // console.log(this.chartData);
  }

  // opens a dialog that runs yourDevice tests
  promptDeviceTest() {
    this.dialogService.open(DeviceTestComponent).onClose.subscribe(res => {
      this.hashrates.yourDevice = res[0];
      this.yourBandwidth = res[1];
    });
  }

  // Controls message that shows up below line chart
  public displayMsg() {
    if (this.realDevices > 0) {
      this.shodanMsg = `Shodan found ${this.realDevices} potentially vulnerable devices. `;
      if (this.chartData) {
        if (this.operation === 'ddos') {
          // 'An attack with these devices would be larger than '
          // + attackName + '!
          if (this.chartData * this.realDevices / 2 > 2300000) {
            this.shodanMsg = this.shodanMsg + 'Assuming you could gain control of half of these devices, you could '
              + 'launch an attack larger than the 2020 Amazon attack!';
          } else if (this.chartData * this.realDevices / 2 > 1350000) {
            this.shodanMsg = this.shodanMsg + 'Assuming you could gain control of half of these devices, you could '
              + 'launch an attack larger than the 2018 Github attack!';
          } else if (this.chartData * this.realDevices / 2 > 623000) {
            this.shodanMsg = this.shodanMsg + 'Assuming you could gain control of half of these devices, you could '
              + 'launch an attack larger than the 2016 Mirai botnet attack!';
          } else if (this.chartData * this.realDevices / 2 > 80000) {
            this.shodanMsg = this.shodanMsg + 'Assuming you could gain control of half of these devices, you could '
              + 'launch an attack larger than the 2015 ProtonMail attack!';
          }
        } else {
          this.shodanMsg = this.shodanMsg + 'Assuming you could gain control of a quarter of these devices, you could '
            + `theoretically generate ${this.moneyFormatter.format(this.chartData * this.realDevices * 0.25)} per year!`;
        }
      } else {
        this.shodanMsg = null;
      }
    }
  }

  public nextScreen() {
    if (this.welcomeScreen) {
      this.welcomeScreen = false;
      this.introScreen = true;
    } else if (this.introScreen) {
      this.introScreen = false;
      this.intro2 = true;
    } else {
      this.intro2 = false;
      this.mainScreen = true;
    }
  }
  // a previous screen function might come in handy...
  // public prevScreen() {
  //   this.screen = this.screen === 1 ? 1 : this.screen--;
  // }
}
