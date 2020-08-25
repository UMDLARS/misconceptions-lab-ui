import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {NbDialogService} from '@nebular/theme';

@Component({
  selector: 'app-image-enlarge',
  templateUrl: './image-enlarge.component.html',
  styleUrls: ['./image-enlarge.component.css']
})
export class ImageEnlargeComponent implements OnInit {
  @Input() source: string;

  constructor(private dialogService: NbDialogService) {}

  ngOnInit() {
    // console.log(this.source);
  }

  show(dialog: TemplateRef<any>) {
    // this.showModal = true;
    this.dialogService.open(dialog, { hasScroll: true });
  }

}
