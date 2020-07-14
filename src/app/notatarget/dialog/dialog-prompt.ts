import {Component} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import * as sha256 from 'crypto-js/sha256';

@Component({
  selector: 'app-dialog-prompt',
  template: `
    <nb-card [nbSpinner]="testing" nbSpinnerStatus="success" nbSpinnerSize="large" nbSpinnerMessage="">
      <nb-card-header>Can we run a couple tests on your device?</nb-card-header>
      <nb-card-body>{{prompt}}</nb-card-body>
      <div class="spinner-border" *ngIf="testing"></div>
      <nb-card-footer>
        <button nbButton status="success" (click)="test()">Run the tests!</button>
        <button nbButton status="danger" (click)="close()">Maybe later</button>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./dialog-prompt.component.scss'],
})
export class DialogPromptComponent {
  public testing = false;
  public prompt = 'Running these tests will take about a minute, but it will be burdensome on your CPU '
    + 'and will require a large chunk of data transfer. If your device\'s battery is low or you don\'t want to '
    + 'waste data consumption, you can try this at a later time.';

  constructor(protected ref: NbDialogRef<DialogPromptComponent>) {}

  close() {
    this.ref.close([0, 0]);
  }

  test() {
    this.testing = true;
    this.prompt = 'Perfoming tests...';
    const hashrate = this.hashTest(10000);
    const bandwidth = this.bandwidthTest();
    this.testing = false;
    this.ref.close([hashrate, bandwidth]);
  }

  bandwidthTest() {
    return 0;
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
}
