import {Component} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import * as sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-dialog-prompt',
  template: `
    <nb-card>
      <nb-card-header>Can we run a couple tests on your device?</nb-card-header>
      <nb-card-body id="promptBody">{{prompt}}</nb-card-body>
      <div class="spinner-border" *ngIf="testing"></div>
      <nb-card-body id="promptBody">{{prompt}}</nb-card-body>
      <div *ngIf="testing" id="wrap">
        <p>
          <nb-progress-bar [value]="progress"></nb-progress-bar>
        </p>
        <p>
          <span id="result"></span><br>
          <span id="eta"></span>
        </p>
      </div>
      <nb-card-footer>
        <button nbButton status="success" (click)="test()">Run the tests!</button>
        <button nbButton status="danger" (click)="close()">Maybe later</button>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./dialog-prompt.component.scss'],
})
export class DialogPromptComponent {
  public progress = 0;
  public testing = false;
  public prompt = 'Running these tests will take about a minute, but it will be burdensome on your CPU '
    + 'and will require a large chunk of data transfer. If your device\'s battery is low or you don\'t want to '
    + 'waste data consumption, you can try this at a later time.';
  public req: XMLHttpRequest = null;
  public start = 0;
  public count = 0;
  public sum = 0;

  constructor(protected ref: NbDialogRef<DialogPromptComponent>) {}

  close() {
    this.ref.close([0, 0]);
  }

  test() {
    this.testing = true;
    this.prompt = 'Perfoming tests...';
    console.log(document.getElementById('promptBody').innerText);
    while (document.getElementById('promptBody').innerText !== 'Performing tests...') {
      document.getElementById('promptBody').innerText = 'Performing tests...';
    }
    const hashrate = this.hashTest(10000);
    const bandwidth = this.bandwidthTest();
    this.testing = false;
    this.ref.close([hashrate, bandwidth]);
  }

  bandwidthTest() {

    /**
     * Start new test
     * and abort any running test
     *
     * @param ev  Click event
     */
    if (this.req) {
        this.req.abort ();
      }

    this.req = new XMLHttpRequest();

    this.start = Date.now ();
    this.count = 0;
    this.sum = 0;

      // btns.forEach (btn => {
      //   btn.className = '';
      // });

      // ev.target.className = 'choice';
    this.progress = 0;

    this.req.onprogress = this.testRunning;
    this.req.onreadystatechange = this.testDone;

    // load file avoiding the cache
    this.req.open('GET', 'https://lars.d.umn.edu/hijodecoche/10mb.bin?' + this.start, true);
    this.req.send(null);
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
    return hashes / timeLimit * 1000; // yields hashes per second
  }

  private testDone() {
    const diff = (Date.now() - this.start) / 1000;

    if (this.req.readyState !== 4) {
      return;
    }

    document.querySelector ('progress').style.visibility = 'hidden';
    document.querySelector ('#result').className = 'resultDone';
    document.querySelector ('#eta').innerHTML = (Math.round(diff * 100) / 100).toString(); // dec (diff, 2) + ' sec';
    this.req = null;
  }
  testRunning(ev) {
    const now = Date.now ();

    let percent = 0.0;
    let Bps = 0;
    let avg = 0;
    let eta = 0;
    let mbit = 0;

    if (ev.lengthComputable && ev.total > 0) {
      Bps = ev.loaded / ((now - this.start) / 1000);
      mbit = Bps / 1024 / 1024 * 8;
      this.count++;
      this.sum += mbit;
      avg = this.sum / this.count;
      percent = ev.loaded / ev.total * 100.0;
      eta = (ev.total - ev.loaded) / Bps;
    }

    this.progress = percent;
    document.querySelector ('#result').innerHTML = (Math.round(avg * 100) / 100).toString() + ' Mbit/s';
    document.querySelector ('#eta').innerHTML = (Math.round(eta * 100) / 100).toString() + ' sec';
  }
}
