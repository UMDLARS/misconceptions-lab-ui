import {Component} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: 'home',
      home: true,
    },
    {
      title: 'LABS',
      group: true,
    },
    {
      title: 'EnCRAPter',
      link: 'encrapter',
    },
  ];

}
