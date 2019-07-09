import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  menuItems: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/home',
      home: true,
      hidden: true, // Without this things stay selected on clicking the Home button
    },
    {
      title: '01-Encryption',
      link: '/encrapter',
    },
    {
      title: '02-Physical Secruity',
      link: '/physicalsecruity',
    },
    {
      title: '03-Not a target',
      link: '/notatarget',
    },
    {
      title: '04-Good Passwords',
      link: '/goodpasswords',
    },
    {
      title: '06-Completely Anonymous',
      link: '/completelyanonymous',
    },
    {
      title: '07- Developing with Security in Mind',
      link: '/securityinmind',
    },
    {
      title: '08-Secruity Product',
      link: '/secruityproduct',
    },
    {
      title: '09-Humans are Rational',
      link: '/humansarerational',
    },
    {
      title: '10-Trust Users',
      link: '/trustusers',
    },
    {
      title: '11-Anonymized Data',
      link: '/anonymized',
    },
    {
      title: '12-Security by Obscurity',
      link: '/securitybyobscurity',
    },
    {
      title: '13-Defense in Depth',
      link: '/defenseindepth',
    },
    {
      title: '14-Users are not Malicious',
      link: '/usersarenotmalicious',
    },
    {
      title: '15-Privacy not Important',
      link: '/privacynotimportant',
    },
    {
      title: '16-Encryption Auto Integrity',
      link: '/encryptionautointegrity',
    },
    {
      title: '17-2FA',
      link: '/twofa',
    },
  ];
}
