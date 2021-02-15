import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Exchange} from './exchanges';
import {MiningStats} from './miningstats';
import {NbDialogService, NbIconConfig} from '@nebular/theme';
import {DeviceTestComponent} from './device-test/device-test.component';
import {environment} from '../../environments/environment';

// https://www.cryptocompare.com/mining/calculator/ for mining calculations
// DDoS numbers from https://blog.cloudflare.com/inside-mirai-the-infamous-iot-botnet-a-retrospective-analysis/

@Component({
  selector: 'app-notatarget',
  templateUrl: './notatarget.component.html',
  styleUrls: ['./notatarget.component.css']
})
export class NotatargetComponent implements OnInit {
  public questions;
  // toggles activity screens
  public welcomeScreen = true;
  public introScreen = false;
  public intro2 = false;
  public mainScreen = false;

  // contains user-selected parameters
  public device: string;
  public operation: string;
  public target: string;
  public showAmplify = false;
  public amplified = 1;
  public bandwidth = 0;

  // contains user's bandwidth if they ran test
  public yourBandwidth = 0;

  public chartData: number;
  public realDevices = environment.realDevices;
  public shodanMsg: string;
  public cryptoDirective: string;
  public guidance: string;
  public hashrates = {
    laptop: 220000,
    smartphone: 30000,
    iot: 15000,
    yourDevice: 0
  };
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
    + 'The red lines indicate the magnitude of historical attacks. Click on them to learn more about a particular attack.'
  };
  private moneyFormatter; // used to make currency numbers look normal
  graphIcon: NbIconConfig = { icon: 'trending-up-outline', pack: 'eva' };
  gridIcon: NbIconConfig = { icon: 'grid-outline', pack: 'eva' };

  // vars for table
  tableNumbers: string[] = ['1000', '2000', '5000', '10,000', this.realDevices.toLocaleString()];
  tableAmounts: any[];
  tableAmountLabel: string;

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
    // any trouble retrieving real-time stats is fine; there are preset values
    // catch blocks are almost certainly unnecessary
    this.getExchangeRates().catch();
    this.getMiningStats().catch();
    this.guidance = this.activityGuidance.intro;
  }

  /**
   * Calculates yearly profit in USD
   * @param currency The cryptocurrency to be mined
   * @param hashrate The number of hashes per sec of all combined devices
   */
  async getProfitCalc(currency: string, hashrate: string) {

    if (hashrate === 'yourDevice' && this.hashrates.yourDevice === 0) {
      const success = await this.promptDeviceTest();
      if (!success || this.hashrates.yourDevice === 0) { return; }
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
        // console.log(this.cryptos.XMR);
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

    // select the appropriate SVG
    const i = new Image();
    if (this.chartData * this.realDevices / 2 >= 5000) {
      i.src = 'assets/images/not-a-target/highMoney.svg';
    } else if (this.chartData >= 2000) {
      i.src = 'assets/images/not-a-target/medMoney.svg';
    } else {
      i.src = 'assets/images/not-a-target/lowMoney.svg';
    }
    i.onload = () => {
      (document.getElementById('meter') as HTMLImageElement).src = i.src;
    };
    this.updateTable();
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

  /**
   * Uses selected bandwidth and amplification to calculate an attack magnitude.
   * Selects low, med, or highBand SVG to display.
   */
  async getAttackMagnitude() {
    if (this.bandwidth <= 0) { // then yourDevice is selected
      if (this.yourBandwidth <= 0) {
        const success = await this.promptDeviceTest();
        if (!success || this.yourBandwidth <= 0) {
          return;
        }
      }
      this.bandwidth = this.yourBandwidth / 1000; // graph looks better when in Gbps
    }
    // console.log('This bandwidth is: ' + this.bandwidth);
    this.chartData = this.amplified * this.bandwidth;
    this.showAmplify = true;
    console.log('chartData: ' + this.chartData);

    // select the appropriate SVG
    const i = new Image();
    if (this.chartData >= 4) {
      i.src = 'assets/images/not-a-target/highBand.svg';
    } else if (this.chartData > 0.01) {
      i.src = 'assets/images/not-a-target/medBand.svg';
    } else {
      i.src = 'assets/images/not-a-target/lowBand.svg';
    }
    i.onload = () => {
      (document.getElementById('meter') as HTMLImageElement).src = i.src;
    };
    this.updateTable();
  }

  updateTable() {
    if (this.operation === 'crypto') {
      this.tableAmountLabel = 'USD per year';
      this.tableAmounts = [
        this.moneyFormatter.format(this.chartData * 1000),
        this.moneyFormatter.format(this.chartData * 2000),
        this.moneyFormatter.format(this.chartData * 5000),
        this.moneyFormatter.format(this.chartData * 10000),
        this.moneyFormatter.format(this.chartData * this.realDevices)];
    } else {
      this.tableAmountLabel = 'Bandwidth (Gbps)';
      this.tableAmounts = [(this.chartData * 1000).toLocaleString(),
        (this.chartData * 2000).toLocaleString(),
        (this.chartData * 5000).toLocaleString(),
        (this.chartData * 10000).toLocaleString(),
        (this.chartData * this.realDevices).toLocaleString()];
    }
  }

  async updateChart() {
    // must await or else graph will attempt to draw before values are initialized
    if (this.operation === 'crypto') {
      await this.getProfitCalc(this.target, this.device);
      this.guidance = this.activityGuidance.afterCrypto;
    } else {
      await this.getAttackMagnitude();
      this.guidance = this.activityGuidance.afterDDoS;
    }
    this.displayMsg();
    // console.log(this.chartData);
  }

  // opens a dialog that runs yourDevice tests
  promptDeviceTest() {
    return new Promise((resolve, reject) => {
      this.dialogService.open(DeviceTestComponent).onClose.subscribe(
        res => {
          this.hashrates.yourDevice = res[0];
          this.yourBandwidth = res[1];
          resolve(true);
          }, err => { // unnecessary, but better safe than sorry
          reject(false);
        });
    });
  }

  // Controls message that shows up above line chart
  public displayMsg() {
    if (this.realDevices > 0) {
      this.shodanMsg = 'Shodan found ' + this.realDevices.toLocaleString()
        + ` potentially vulnerable devices on ${environment.realDeviceDate}. `;
      if (this.chartData) {
        if (this.operation === 'ddos') {
          this.cryptoDirective = null;
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
          this.shodanMsg = this.shodanMsg + 'Assuming you could gain control of half of these devices, you could '
            + `theoretically generate ${this.moneyFormatter.format(this.chartData * this.realDevices / 2)} per year!`;
          this.cryptoDirective = 'Try mining other cryptocurrencies! Their values fluctuate regularly, so a different '
          + 'mining operation might make more money!';
        }
      } else {
        this.shodanMsg = null;
        this.cryptoDirective = null;
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
      if (this.hashrates.yourDevice === 0) {
        // just trust me that we need dummyVar
        const dummyVar = this.promptDeviceTest();
      }
      this.intro2 = false;
      this.mainScreen = true;
    }
  }
}
