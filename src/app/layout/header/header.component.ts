import {Component, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  expanded: boolean;

  constructor(private sidebarService: NbSidebarService) {
  }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true);
    this.expanded = !this.expanded;
    return false;
  }
}
