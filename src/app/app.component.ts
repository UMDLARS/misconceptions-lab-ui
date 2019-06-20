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
      link: '/',
      home: true,
    },
    {
      title: 'LABS',
      group: true,
    },
    {
      title: 'EnCRAPter',
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

}
