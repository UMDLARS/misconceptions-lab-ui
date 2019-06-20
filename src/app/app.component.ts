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
      icon: 'nb-home',
      link: '/',
      home: true,
    },
    {
      title: 'LABS',
      group: true,
    },
    {
      title: 'EnCRAPter',
      icon: 'nb-locked',
      children: [
        {
          title: 'Login',
          link: '/auth/login',
        },
        {
          title: 'Register',
          link: '/auth/register',
        },
        {
          title: 'Request Password',
          link: '/auth/request-password',
        },
        {
          title: 'Reset Password',
          link: '/auth/reset-password',
        },
      ],
    },
  ];
;
  cyphers = ['rot13', 'Josiecrypt', 'One Time Pad'];
  selectedCypher: any;
}
