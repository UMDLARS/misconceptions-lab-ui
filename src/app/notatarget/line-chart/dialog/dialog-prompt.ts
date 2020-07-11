import {Component} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-dialog-prompt',
  template: `<ng-template #dialog let-data let-ref="dialogRef">
    <nb-card>
      <nb-card-header>Can we run a couple tests on your device?</nb-card-header>
      <nb-card-body>Running these tests will take about a minute, but it will be burdensome on your CPU
      and will require a large chunk of data transfer. If your device's battery is low or you don't want to
      waste data consumption, you can try this at a later time.</nb-card-body>
      <nb-card-footer>
        <button nbButton status="success" (click)="close(true)">Run the tests!</button>
        <button nbButton status="danger" (click)="close(false)">Maybe later</button>
      </nb-card-footer>
    </nb-card>
  </ng-template>
<!--  <button nbButton (click)="open(dialog)">Open Dialog</button>-->
  `,
  styleUrls: ['./dialog-prompt.component.scss'],
})
export class DialogPromptComponent {

  constructor(protected ref: NbDialogRef<DialogPromptComponent>) {}

  close(runTest: boolean) {
    this.ref.close(runTest);
  }
}
